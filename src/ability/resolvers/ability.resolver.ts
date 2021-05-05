import { BadRequestException, ConflictException, Logger } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MongoHttpStatus } from '@shared/enums/mongo.enum';
import { AbilityInputDto } from '../dto/ability-input.dto';
import { AbilityDto } from '../dto/ability.dto';
import { AbilityDocument } from '../schema/ability.schema';
import { AbilityService } from '../service/ability.service';

@Resolver(() => AbilityDto)
export class AbilityResolver {
  private readonly LOGGER = new Logger(AbilityResolver.name);

  constructor(private readonly abilityService: AbilityService) {}

  @Mutation(() => AbilityDto)
  async createAbility(
    @Args('abilityInputDto') abilityInputDto: AbilityInputDto
  ): Promise<AbilityDto> {
    try {
      const ability: AbilityDocument = await this.abilityService.create(
        abilityInputDto
      );
      return new AbilityDto(ability);
    } catch (error) {
      this.LOGGER.error(`Create request failed because: ${error}`);

      if (error.code === MongoHttpStatus.DUPLICATE_KEY) {
        throw new ConflictException(
          `An object with name ${abilityInputDto.name} already exists`
        );
      }

      throw new BadRequestException(error);
    }
  }

  @Query(() => [AbilityDto], { name: 'abilities' })
  async findAll(): Promise<AbilityDto[]> {
    try {
      const abilities: AbilityDocument[] = await this.abilityService.findAll();

      return abilities.map(ability => new AbilityDto(ability));
    } catch (error) {
      this.LOGGER.error(`Cannot find all abilities because: ${error}`);
      throw new BadRequestException(error);
    }
  }

  @Query(() => AbilityDto, { name: 'ability' })
  async findOne(
    @Args('id', { type: () => String }) id: string
  ): Promise<AbilityDto> {
    try {
      const ability: AbilityDocument = await this.abilityService.find(id);

      return new AbilityDto(ability);
    } catch (error) {
      this.LOGGER.error(
        `Cannot find ability by its id ${id} because: ${error}`
      );
      throw new BadRequestException(error);
    }
  }

  @Mutation(() => AbilityDto)
  async updateAbility(
    @Args('id') id: string,
    @Args('abilityInputDto') abilityInputDto: AbilityInputDto
  ): Promise<AbilityDto> {
    try {
      const ability: AbilityDocument = await this.abilityService.update(
        id,
        abilityInputDto
      );

      return new AbilityDto(ability);
    } catch (error) {
      this.LOGGER.error(
        `Cannot update ability with id ${id} because: ${error}`
      );
      throw new BadRequestException(error);
    }
  }

  @Mutation(() => AbilityDto)
  async removeAbility(
    @Args('id', { type: () => String }) id: string
  ): Promise<void> {
    try {
      await this.abilityService.delete(id);
    } catch (error) {
      this.LOGGER.error(
        `Cannot delete ability with id ${id} because: ${error}`
      );
      throw new BadRequestException(error);
    }
  }
}
