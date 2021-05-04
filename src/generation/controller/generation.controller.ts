import { GenerationInputDto } from '@generation/dto/generation-input.dto';
import { GenerationDto } from '@generation/dto/generation.dto';
import { Generation } from '@generation/schema/generation.schema';
import { GenerationService } from '@generation/service/generation.service';
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

@Controller('generation')
export class GenerationController {
  private readonly LOGGER = new Logger(Generation.name);
  constructor(private readonly generationService: GenerationService) {}
  @Post()
  @HttpCode(201)
  async create(
    @Body() generationInputDto: GenerationInputDto
  ): Promise<GenerationDto> {
    try {
      const generation = await this.generationService.create(
        generationInputDto
      );
      return new GenerationDto(generation);
    } catch (error) {
      this.LOGGER.error(`Create request failed because: ${error}`);

      if (error.code === MongoHttpStatus.DUPLICATE_KEY) {
        throw new ConflictException(
          `An object with name ${generationInputDto.order} already exists`
        );
      }

      throw new BadRequestException(error);
    }
  }

  @Get()
  async findAll(@Res() res: Response): Promise<Response<GenerationDto>> {
    try {
      const generations = await this.generationService.findAll();

      if (!generations || generations.length === 0) {
        return res.status(204).send();
      }

      return res.status(200).send(generations);
    } catch (error) {
      this.LOGGER.error(`Cannot find all generations because: ${error}`);
      throw new BadRequestException(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<GenerationDto> {
    try {
      const generation: Generation = await this.generationService.find(id);

      return new GenerationDto(generation);
    } catch (error) {
      this.LOGGER.error(
        `Cannot find generation by its id ${id} because: ${error}`
      );
      throw new BadRequestException(error);
    }
  }

  @Patch(':id')
  @HttpCode(202)
  async update(
    @Param('id') id: string,
    @Body() generationInputDto: GenerationInputDto
  ): Promise<GenerationDto> {
    try {
      const generation: Generation = await this.generationService.update(
        id,
        generationInputDto
      );

      return new GenerationDto(generation);
    } catch (error) {
      this.LOGGER.error(
        `Cannot update generation with id ${id} because: ${error}`
      );
      throw new BadRequestException(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    try {
      await this.generationService.delete(id);
    } catch (error) {
      this.LOGGER.error(
        `Cannot delete generation with id ${id} because: ${error}`
      );
      throw new BadRequestException(error);
    }
  }
}
