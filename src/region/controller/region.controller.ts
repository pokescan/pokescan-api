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
import { RegionInputDto } from '@region/dto/region-input.dto';
import { RegionDto } from '@region/dto/region.dto';
import { Region } from '@region/schema/region.schema';
import { RegionService } from '@region/service/region.service';
import { MongoHttpStatus } from '@shared/enums/mongo.enum';
import { Response } from 'express';

@Controller('regions')
export class RegionController {
  private readonly LOGGER = new Logger(RegionController.name);
  constructor(private readonly regionService: RegionService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() regionInputDto: RegionInputDto): Promise<RegionDto> {
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

  @Get()
  async findAll(@Res() res: Response): Promise<Response<RegionDto>> {
    try {
      const regions = await this.regionService.findAll();

      if (!regions || regions.length === 0) {
        return res.status(204).send();
      }

      return res.status(200).send(regions);
    } catch (error) {
      this.LOGGER.error(`Cannot find all regions because: ${error}`);
      throw new BadRequestException(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<RegionDto> {
    try {
      const region: Region = await this.regionService.find(id);

      return new RegionDto(region);
    } catch (error) {
      this.LOGGER.error(`Cannot find region by its id ${id} because: ${error}`);
      throw new BadRequestException(error);
    }
  }

  @Patch(':id')
  @HttpCode(202)
  async update(
    @Param('id') id: string,
    @Body() regionInputDto: RegionInputDto
  ): Promise<RegionDto> {
    try {
      const region: Region = await this.regionService.update(
        id,
        regionInputDto
      );

      return new RegionDto(region);
    } catch (error) {
      this.LOGGER.error(`Cannot update region with id ${id} because: ${error}`);
      throw new BadRequestException(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    try {
      await this.regionService.delete(id);
    } catch (error) {
      this.LOGGER.error(`Cannot delete region with id ${id} because: ${error}`);
      throw new BadRequestException(error);
    }
  }
}
