import {
  BadRequestException,
  Body,
  ConflictException,
  Delete,
  Get,
  HttpCode,
  Logger,
  Param,
  Patch,
  Post,
  Res
} from '@nestjs/common';
import { PokemonStatInputDto } from '@pokemon-stat/dto/pokemon-stat-input.dto';
import { PokemonStatDto } from '@pokemon-stat/dto/pokemon-stat.dto';
import { PokemonStat } from '@pokemon-stat/schema/pokemon-stat.schema';
import { MongoHttpStatus } from '@shared/enums/mongo.enum';
import { Response } from 'express';
import { PokemonStatService } from '../service/pokemon-stat.service';

export class PokemonStatController {
  private readonly LOGGER = new Logger(PokemonStatController.name);

  constructor(private readonly pokemonStatService: PokemonStatService) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body() pokemonStatInputDto: PokemonStatInputDto
  ): Promise<PokemonStatDto> {
    try {
      const pokemonStat = await this.pokemonStatService.create(
        pokemonStatInputDto
      );
      return new PokemonStatDto(pokemonStat);
    } catch (error) {
      this.LOGGER.error(`Create request failed because: ${error}`);

      if (error.code === MongoHttpStatus.DUPLICATE_KEY) {
        throw new ConflictException(
          `An object with name ${pokemonStatInputDto.name} already exists`
        );
      }

      throw new BadRequestException(error);
    }
  }

  @Get()
  async findAll(@Res() res: Response): Promise<Response<PokemonStatDto>> {
    try {
      const pokemonStats = await this.pokemonStatService.findAll();

      if (!pokemonStats || pokemonStats.length === 0) {
        return res.status(204).send();
      }

      return res
        .status(200)
        .send(pokemonStats.map(stat => new PokemonStatDto(stat)));
    } catch (error) {
      this.LOGGER.error(`Cannot find all pokemon stats because: ${error}`);
      throw new BadRequestException(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PokemonStatDto> {
    try {
      const pokemonStat: PokemonStat = await this.pokemonStatService.find(id);

      return new PokemonStatDto(pokemonStat);
    } catch (error) {
      this.LOGGER.error(
        `Cannot find pokemonStat by its id ${id} because: ${error}`
      );
      throw new BadRequestException(error);
    }
  }

  @Patch(':id')
  @HttpCode(202)
  async update(
    @Param('id') id: string,
    @Body() pokemonStatInputDto: PokemonStatInputDto
  ): Promise<PokemonStatDto> {
    try {
      const pokemonStat: PokemonStat = await this.pokemonStatService.update(
        id,
        pokemonStatInputDto
      );

      return new PokemonStatDto(pokemonStat);
    } catch (error) {
      this.LOGGER.error(
        `Cannot update pokemonStat with id ${id} because: ${error}`
      );
      throw new BadRequestException(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    try {
      await this.pokemonStatService.delete(id);
    } catch (error) {
      this.LOGGER.error(
        `Cannot delete pokemonStat with id ${id} because: ${error}`
      );
      throw new BadRequestException(error);
    }
  }
}
