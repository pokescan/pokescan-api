import { LocationDto } from '@location/dto/location.dto';
import { Location } from '@location/schema/location.schema';
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  Logger,
  Param,
  Patch,
  Post,
  Res
} from '@nestjs/common';
import { MongoHttpStatus } from '@shared/enums/mongo.enum';
import { Response } from 'express';
import { LocationInputDto } from '../dto/location-input.dto';
import { LocationService } from '../service/location.service';

@Controller('location')
export class LocationController {
  private readonly LOGGER = new Logger(Location.name);
  constructor(private readonly locationService: LocationService) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body() locationInputDto: LocationInputDto
  ): Promise<LocationDto> {
    try {
      const location = await this.locationService.create(locationInputDto);
      return new LocationDto(location);
    } catch (error) {
      this.LOGGER.error(`Create request failed because: ${error}`);

      if (error.code === MongoHttpStatus.DUPLICATE_KEY) {
        throw new ConflictException(
          `An object with name ${locationInputDto.name} already exists`
        );
      }

      throw new BadRequestException(error);
    }
  }

  @Get()
  async findAll(@Res() res: Response): Promise<Response<LocationDto>> {
    try {
      const locations = await this.locationService.findAll();

      if (!locations || locations.length === 0) {
        return res.status(204).send();
      }

      return res.status(200).send(locations);
    } catch (error) {
      this.LOGGER.error(`Cannot find all locations because: ${error}`);
      throw new BadRequestException(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<LocationDto> {
    try {
      const location: Location = await this.locationService.find(id);

      return new LocationDto(location);
    } catch (error) {
      this.LOGGER.error(
        `Cannot find location by its id ${id} because: ${error}`
      );
      throw new BadRequestException(error);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() locationInputDto: LocationInputDto
  ): Promise<LocationInputDto> {
    try {
      const location: Location = await this.locationService.update(
        id,
        locationInputDto
      );

      return new LocationDto(location);
    } catch (error) {
      this.LOGGER.error(
        `Cannot update location with id ${id} because: ${error}`
      );
      throw new BadRequestException(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
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
