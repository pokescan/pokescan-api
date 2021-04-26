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
import { PokemonTypeInputDto } from '../dto/pokemon-type-input.dto';
import { PokemonTypeDto } from '../dto/pokemon-type.dto';
import { PokemonType } from '../schema/pokemon-type.schema';
import { PokemonTypeService } from '../service/pokemon-type.service';

@Controller('pokemon-types')
export class PokemonTypeController {
  private readonly LOGGER = new Logger(PokemonTypeController.name);

  constructor(private readonly pokemonTypeService: PokemonTypeService) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body() pokemonTypeInputDto: PokemonTypeInputDto
  ): Promise<PokemonTypeDto> {
    try {
      const pokemonType = await this.pokemonTypeService.create(
        pokemonTypeInputDto
      );
      return new PokemonTypeDto(pokemonType);
    } catch (error) {
      this.LOGGER.error(`Create request failed because: ${error}`);

      if (error.code === MongoHttpStatus.DUPLICATE_KEY) {
        throw new ConflictException(
          `An object with name ${pokemonTypeInputDto.name} already exists`
        );
      }

      throw new BadRequestException(error);
    }
  }

  @Get()
  async findAll(@Res() res: Response): Promise<Response<PokemonTypeDto>> {
    try {
      const pokemonTypes = await this.pokemonTypeService.findAll();

      if (!pokemonTypes || pokemonTypes.length === 0) {
        return res.status(204).send();
      }

      return res
        .status(200)
        .send(pokemonTypes.map(type => new PokemonTypeDto(type)));
    } catch (error) {
      this.LOGGER.error(`Cannot find all abilities because: ${error}`);
      throw new BadRequestException(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PokemonTypeDto> {
    try {
      const pokemonType: PokemonType = await this.pokemonTypeService.find(id);

      return new PokemonTypeDto(pokemonType);
    } catch (error) {
      this.LOGGER.error(
        `Cannot find pokemonType by its id ${id} because: ${error}`
      );
      throw new BadRequestException(error);
    }
  }

  @Patch(':id')
  @HttpCode(202)
  async update(
    @Param('id') id: string,
    @Body() pokemonTypeInputDto: PokemonTypeInputDto
  ): Promise<PokemonTypeDto> {
    try {
      const pokemonType: PokemonType = await this.pokemonTypeService.update(
        id,
        pokemonTypeInputDto
      );

      return new PokemonTypeDto(pokemonType);
    } catch (error) {
      this.LOGGER.error(
        `Cannot update pokemonType with id ${id} because: ${error}`
      );
      throw new BadRequestException(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    try {
      await this.pokemonTypeService.delete(id);
    } catch (error) {
      this.LOGGER.error(
        `Cannot delete pokemonType with id ${id} because: ${error}`
      );
      throw new BadRequestException(error);
    }
  }
}
