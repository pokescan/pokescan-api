import { BadRequestException, ConflictException, Logger } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RegionInputDto } from '@region/dto/region-input.dto';
import { RegionDto } from '@region/dto/region.dto';
import { RegionDocument } from '@region/schema/region.schema';
import { RegionService } from '@region/service/region.service';
import { MongoHttpStatus } from '@shared/enums/mongo.enum';

@Resolver(() => RegionDto)
export class RegionResolver {
  private readonly LOGGER = new Logger(RegionResolver.name);

  constructor(private readonly regionService: RegionService) {}

  @Mutation(() => RegionDto)
  async createAbility(
    @Args('regionInputDto') regionInputDto: RegionInputDto
  ): Promise<RegionDto> {
    try {
      const region = await this.regionService.create(regionInputDto);
      return new RegionDto(region);
    } catch (error) {
      this.LOGGER.error(`Create request failed because: ${error}`);

      if (error.code === MongoHttpStatus.DUPLICATE_KEY) {
        throw new ConflictException(
          `An object with name ${regionInputDto.name} already exists`
        );
      }

      throw new BadRequestException(error);
    }
  }

  @Query(() => [RegionDto], { name: 'regions' })
  async findAll(): Promise<RegionDto[]> {
    try {
      const regions: RegionDocument[] = await this.regionService.findAll();

      return regions.map(region => new RegionDto(region));
    } catch (error) {
      this.LOGGER.error(`Cannot find all regions because: ${error}`);
      throw new BadRequestException(error);
    }
  }

  @Query(() => RegionDto, { name: 'region' })
  async findOne(
    @Args('id', { type: () => String }) id: string
  ): Promise<RegionDto> {
    try {
      const region: RegionDocument = await this.regionService.find(id);

      return new RegionDto(region);
    } catch (error) {
      this.LOGGER.error(`Cannot find region by its id ${id} because: ${error}`);

      throw new BadRequestException(error);
    }
  }

  @Mutation(() => RegionDto)
  async updateAbility(
    @Args('id') id: string,
    @Args('regionInputDto') regionInputDto: RegionInputDto
  ): Promise<RegionDto> {
    try {
      const region: RegionDocument = await this.regionService.update(
        id,
        regionInputDto
      );

      return new RegionDto(region);
    } catch (error) {
      this.LOGGER.error(`Cannot update region with id ${id} because: ${error}`);

      throw new BadRequestException(error);
    }
  }

  @Mutation(() => RegionDto, { nullable: true })
  async removeAbility(@Args('id') id: string): Promise<void> {
    try {
      await this.regionService.delete(id);
    } catch (error) {
      this.LOGGER.error(`Cannot delete region with id ${id} because: ${error}`);

      throw new BadRequestException(error);
    }
  }
}
