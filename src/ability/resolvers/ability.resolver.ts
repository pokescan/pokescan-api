import { UpdateAbilityDto } from '@ability/dto/update-ability.dto';
import { BadRequestException, ConflictException, Logger } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MongoHttpStatus } from '@shared/enums/mongo.enum';
import { BaseResolver } from '@shared/functions/base-resolver';
import { AbilityDto } from '../dto/ability.dto';
import { CreateAbilityDto } from '../dto/create-ability.dto';
import { AbilityDocument } from '../schema/ability.schema';
import { AbilityService } from '../service/ability.service';

@Resolver(() => AbilityDto)
export class AbilityResolver extends BaseResolver(AbilityDto) {
  private readonly LOGGER = new Logger(AbilityResolver.name);

  constructor(private readonly abilityService: AbilityService) {
    super(abilityService);
  }

  @Mutation(() => AbilityDto)
  async createAbility(
    @Args('abilityInputDto') abilityInputDto: CreateAbilityDto
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
    @Args('abilityInputDto') { id, ...dto }: UpdateAbilityDto
  ): Promise<AbilityDto> {
    try {
      const abilityToUpdate: AbilityDocument = await this.abilityService.find(
        id
      );

      if (!abilityToUpdate) {
        this.LOGGER.error(
          `Cannot update ability with id #${id} because it does not exist`
        );
        throw new BadRequestException(
          `Cannot update ability with id #${id} because it does not exist`
        );
      }

      const ability: AbilityDocument = await this.abilityService.update(
        id,
        dto
      );

      return new AbilityDto(ability);
    } catch (error) {
      this.LOGGER.error(
        `Cannot update ability with id ${id} because: ${error}`
      );
      throw new BadRequestException(error);
    }
  }

  @Mutation(() => AbilityDto, { nullable: true })
  async removeAbility(@Args('id') id: string): Promise<void> {
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
