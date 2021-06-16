import { BadRequestException, ConflictException, Logger } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MongoHttpStatus } from '@shared/enums/mongo.enum';
import { BaseResolver } from '@shared/functions/base-resolver';
import { CreateEggGroupDto } from '../dto/create-egg-group.dto';
import { EggGroupDto } from '../dto/egg-group.dto';
import { UpdateEggGroupDto } from '../dto/update-egg-group.dto';
import { EggGroupDocument } from '../schema/egg-group.schema';
import { EggGroupService } from '../service/egg-group.service';

@Resolver(() => EggGroupDto)
export class EggGroupResolver extends BaseResolver(EggGroupDto) {
  private readonly LOGGER = new Logger(EggGroupResolver.name);

  constructor(private readonly eggGroupService: EggGroupService) {
    super(eggGroupService);
  }

  @Mutation(() => EggGroupDto)
  async createEggGroup(
    @Args('createEggGroupInput') createEggGroup: CreateEggGroupDto
  ): Promise<EggGroupDto> {
    try {
      const eggGroup: EggGroupDocument = await this.eggGroupService.create(
        createEggGroup
      );

      return new EggGroupDto(eggGroup);
    } catch (error) {
      this.LOGGER.error(`Create request failed because: ${error}`);

      if (error.code === MongoHttpStatus.DUPLICATE_KEY) {
        throw new ConflictException(
          `An object with name ${createEggGroup.name} already exists`
        );
      }

      throw new BadRequestException(error);
    }
  }

  @Query(() => EggGroupDto, { name: 'eggGroup' })
  async findOne(@Args('id') id: string): Promise<EggGroupDto> {
    try {
      const eggGroup: EggGroupDocument = await this.eggGroupService.find(id);

      return new EggGroupDto(eggGroup);
    } catch (error) {
      this.LOGGER.error(
        `Cannot find egg group by its id ${id} because: ${error}`
      );
      throw new BadRequestException(error);
    }
  }

  @Mutation(() => EggGroupDto)
  async updateEggGroup(
    @Args('updateEggGroupInput') updateEggGroup: UpdateEggGroupDto
  ): Promise<EggGroupDto> {
    try {
      const eggGroup: EggGroupDocument = await this.eggGroupService.update(
        updateEggGroup.id,
        updateEggGroup
      );

      return new EggGroupDto(eggGroup);
    } catch (error) {
      this.LOGGER.error(
        `Cannot update eggGroup with id ${updateEggGroup.id} because: ${error}`
      );
      throw new BadRequestException(error);
    }
  }

  @Mutation(() => EggGroupDto, { nullable: true })
  async removeEggGroup(@Args('id') id: string): Promise<void> {
    try {
      await this.eggGroupService.delete(id);
    } catch (error) {
      this.LOGGER.error(
        `Cannot delete egg group with id ${id} because: ${error}`
      );

      throw new BadRequestException(error);
    }
  }
}
