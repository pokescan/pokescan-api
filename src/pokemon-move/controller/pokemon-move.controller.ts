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
import { PokemonMoveInputDto } from '../dto/pokemon-move-input.dto';
import { PokemonMoveDto } from '../dto/pokemon-move.dto';
import { PokemonMove } from '../schema/pokemon-move.schema';
import { PokemonMoveService } from '../service/pokemon-move.service';

@Controller('pokemon-moves')
export class PokemonMoveController {
  private readonly LOGGER = new Logger(PokemonMoveController.name);

  constructor(private readonly pokemonMoveService: PokemonMoveService) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body() pokemonMoveInputDto: PokemonMoveInputDto
  ): Promise<PokemonMoveDto> {
    try {
      const type = await this.pokemonMoveService.create(pokemonMoveInputDto);
      return new PokemonMoveDto(type);
    } catch (error) {
      this.LOGGER.error(`Create request failed because: ${error}`);

      if (error.code === MongoHttpStatus.DUPLICATE_KEY) {
        throw new ConflictException(
          `An object with name ${pokemonMoveInputDto.name} already exists`
        );
      }

      throw new BadRequestException(error);
    }
  }

  @Get()
  async findAll(@Res() res: Response): Promise<Response<PokemonMoveDto>> {
    try {
      const abilities = await this.pokemonMoveService.findAll();

      if (!abilities || abilities.length === 0) {
        return res.status(204).send();
      }

      return res.status(200).send(abilities);
    } catch (error) {
      this.LOGGER.error(`Cannot find all abilities because: ${error}`);
      throw new BadRequestException(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PokemonMoveDto> {
    try {
      const pokemonMove: PokemonMove = await this.pokemonMoveService.find(id);

      return new PokemonMoveDto(pokemonMove);
    } catch (error) {
      this.LOGGER.error(
        `Cannot find pokemonMove by its id ${id} because: ${error}`
      );
      throw new BadRequestException(error);
    }
  }

  @Patch(':id')
  @HttpCode(202)
  async update(
    @Param('id') id: string,
    @Body() pokemonMoveInputDto: PokemonMoveInputDto
  ): Promise<PokemonMoveDto> {
    try {
      const pokemonMove: PokemonMove = await this.pokemonMoveService.update(
        id,
        pokemonMoveInputDto
      );

      return new PokemonMoveDto(pokemonMove);
    } catch (error) {
      this.LOGGER.error(
        `Cannot update pokemonMove with id ${id} because: ${error}`
      );
      throw new BadRequestException(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    try {
      await this.pokemonMoveService.delete(id);
    } catch (error) {
      this.LOGGER.error(
        `Cannot delete pokemonMove with id ${id} because: ${error}`
      );
      throw new BadRequestException(error);
    }
  }
}
