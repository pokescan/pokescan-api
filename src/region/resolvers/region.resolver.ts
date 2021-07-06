import { LocationDto } from '@location/dto/location.dto';
import { LocationDocument } from '@location/schema/location.schema';
import { LocationService } from '@location/service/location.service';
import { BadRequestException, ConflictException, Logger } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver
} from '@nestjs/graphql';
import { CreateRegionDto } from '@region/dto/create-region.dto';
import { RegionDto } from '@region/dto/region.dto';
import { RegionDocument } from '@region/schema/region.schema';
import { RegionService } from '@region/service/region.service';
import { MongoHttpStatus } from '@shared/enums/mongo.enum';
import { BaseResolver } from '@shared/functions/base-resolver';

@Resolver(() => RegionDto)
export class RegionResolver extends BaseResolver(RegionDto) {
  private readonly LOGGER = new Logger(RegionResolver.name);

  constructor(
    private readonly regionService: RegionService,
    private readonly locationService: LocationService
  ) {
    super(regionService);
  }

  @Mutation(() => RegionDto)
  async createRegion(
    @Args('regionInputDto') createRegion: CreateRegionDto
  ): Promise<RegionDto> {
    try {
      const region = await this.regionService.create(createRegion);
      return new RegionDto(region);
    } catch (error) {
      this.LOGGER.error(`Create request failed because: ${error}`);

      if (error.code === MongoHttpStatus.DUPLICATE_KEY) {
        throw new ConflictException(
          `An object with name ${createRegion.name} already exists`
        );
      }

      throw new BadRequestException(error);
    }
  }

  @Query(() => RegionDto, { name: 'region' })
  async findOne(@Args('id') id: string): Promise<RegionDto> {
    try {
      const region: RegionDocument = await this.regionService.find(id);

      return new RegionDto(region);
    } catch (error) {
      this.LOGGER.error(`Cannot find region by its id ${id} because: ${error}`);

      throw new BadRequestException(error);
    }
  }

  @ResolveField('locations', () => [LocationDto])
  async findLocationsRelatedToRegion(
    @Parent() region: RegionDto
  ): Promise<LocationDto[]> {
    console.log(
      '🚀 ~ file: region.resolver.ts ~ line 68 ~ RegionResolver ~ classRegionResolverextendsBaseResolver ~ region',
      region
    );
    try {
      // const locations: LocationDocument[] = await this.locationService.findByQueries(
      //   {
      //     region: region.id
      //   }
      // );

      const locations: LocationDocument[] = await this.locationService.aggregate(
        [
          {
            $match: {
              region: region.id
            }
          }
        ]
      );

      return locations.map(location => new LocationDto(location));
    } catch (error) {
      this.LOGGER.error(
        `Cannot find locations for region with id ${region.id} because: ${error}`
      );

      throw new BadRequestException(error);
    }
  }

  @Mutation(() => RegionDto, { nullable: true })
  async removeRegion(@Args('id') id: string): Promise<void> {
    try {
      await this.regionService.delete(id);
    } catch (error) {
      this.LOGGER.error(`Cannot delete region with id ${id} because: ${error}`);

      throw new BadRequestException(error);
    }
  }
}
