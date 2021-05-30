import { CreateLocationDto } from '@location/dto/create-location.dto';
import { LocationDto } from '@location/dto/location.dto';
import { LocationDocument } from '@location/schema/location.schema';
import { LocationService } from '@location/service/location.service';
import { BadRequestException, ConflictException, Logger } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MongoHttpStatus } from '@shared/enums/mongo.enum';
import { BaseResolver } from '@shared/functions/base-resolver';

@Resolver(() => LocationDto)
export class LocationResolver extends BaseResolver(LocationDto) {
  private readonly LOGGER = new Logger(LocationResolver.name);

  constructor(private readonly locationService: LocationService) {
    super(locationService);
  }

  @Mutation(() => LocationDto)
  async createLocation(
    @Args('createLocationDto') createLocationDto: CreateLocationDto
  ): Promise<LocationDto> {
    try {
      const location = await this.locationService.create(createLocationDto);
      return new LocationDto(location);
    } catch (error) {
      this.LOGGER.error(`Create request failed because: ${error}`);

      if (error.code === MongoHttpStatus.DUPLICATE_KEY) {
        throw new ConflictException(
          `An object with name ${createLocationDto.name} already exists`
        );
      }

      throw new BadRequestException(error);
    }
  }

  @Query(() => LocationDto, { name: 'location' })
  async findOne(@Args('id') id: string): Promise<LocationDto> {
    try {
      const location: LocationDocument = await this.locationService.find(id);

      return new LocationDto(location);
    } catch (error) {
      this.LOGGER.error(
        `Cannot find location by its id ${id} because: ${error}`
      );
      throw new BadRequestException(error);
    }
  }

  @Mutation(() => LocationDto, { nullable: true })
  async removeLocation(@Args('id') id: string): Promise<void> {
    try {
      await this.locationService.delete(id);
    } catch (error) {
      this.LOGGER.error(
        `Cannot delete location with id ${id} because: ${error}`
      );
      throw new BadRequestException(error);
    }
  }
}
