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
import { PokemonMoveDetailInputDto } from '@pokemon-move-detail/dto/pokemon-move-detail-input.dto';
import { PokemonMoveDetailDto } from '@pokemon-move-detail/dto/pokemon-move-detail.dto';
import { PokemonMoveDetailDocument } from '@pokemon-move-detail/schema/pokemon-move-detail.schema';
import { PokemonMoveDetailService } from '@pokemon-move-detail/service/pokemon-move-detail.service';
import { MongoHttpStatus } from '@shared/enums/mongo.enum';
import { Response } from 'express';
import { CreatePokemonMoveDto } from '../dto/create-pokemon-move.dto';
import { PokemonMoveDto } from '../dto/pokemon-move.dto';
import { PokemonMoveDocument } from '../schema/pokemon-move.schema';
import { PokemonMoveService } from '../service/pokemon-move.service';

export class PokemonMoveController {
  private readonly LOGGER = new Logger(PokemonMoveController.name);

  constructor(
    private readonly pokemonMoveService: PokemonMoveService,
    private readonly pokemonMoveDetailService: PokemonMoveDetailService
  ) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body() pokemonMoveInputDto: CreatePokemonMoveDto
  ): Promise<PokemonMoveDto> {
    try {
      const pokemonMove: PokemonMoveDocument = await this.pokemonMoveService.create(
        pokemonMoveInputDto
      );
      return new PokemonMoveDto(pokemonMove);
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
      const pokemonMoves: PokemonMoveDocument[] = await this.pokemonMoveService.findAll();

      if (!pokemonMoves || pokemonMoves.length === 0) {
        return res.status(204).send();
      }

      return res.status(200).send(pokemonMoves);
    } catch (error) {
      this.LOGGER.error(`Cannot find all abilities because: ${error}`);
      throw new BadRequestException(error);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<PokemonMoveDto> {
    return this.findPokemonMoveById(id);
  }

  @Patch(':id')
  @HttpCode(202)
  async update(
    @Param('id') id: string,
    @Body() pokemonMoveInputDto: CreatePokemonMoveDto
  ): Promise<PokemonMoveDto> {
    try {
      const pokemonMove: PokemonMoveDocument = await this.pokemonMoveService.update(
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

  @Post(':id/details')
  async createPokemonMoveDetail(
    @Param('id') id: string,
    pokemonMoveDetailInput: PokemonMoveDetailInputDto
  ): Promise<PokemonMoveDetailDto> {
    try {
      const pokemonMove: PokemonMoveDto = await this.findPokemonMoveById(id);

      if (null == pokemonMove) {
        throw new BadRequestException(
          `Cannot create pokemon move detail for pokemonMove with id #${id} because it does not exist`
        );
      }

      const pokemonMoveDetail: PokemonMoveDetailDocument = await this.pokemonMoveDetailService.create(
        { ...pokemonMoveDetailInput, pokemonMove }
      );

      return new PokemonMoveDetailDto(pokemonMoveDetail);
    } catch (error) {
      this.LOGGER.error(
        `Cannot create pokemon move detail for pokemonMove with id #${id} because: ${error}`
      );
      throw new BadRequestException(error);
    }
  }

  @Get(':id/details')
  async getAllPokemonMoveDetails(
    @Res() res: Response,
    @Param('id') id: string
  ): Promise<Response<PokemonMoveDetailDto[]>> {
    try {
      const pokemonMove: PokemonMoveDto = await this.findPokemonMoveById(id);

      if (null == pokemonMove) {
        throw new BadRequestException(
          `Cannot create pokemon move detail for pokemonMove with id #${id} because it does not exist`
        );
      }

      const pokemonMoveDetails: PokemonMoveDetailDocument[] = await this.pokemonMoveDetailService.aggregate(
        [
          {
            $match: { pokemonMove: id }
          }
        ]
      );

      if (!pokemonMoveDetails || pokemonMoveDetails?.length === 0) {
        return res.status(204).send();
      }

      return res
        .status(200)
        .send(pokemonMoveDetails.map(pmd => new PokemonMoveDetailDto(pmd)));
    } catch (error) {
      this.LOGGER.error(
        `Cannot get all pokemon move detail for pokemonMove with id #${id} because: ${error}`
      );

      throw new BadRequestException(error);
    }
  }

  @Get(':id/details/:pokemonMoveDetailId')
  async getPokemonMoveDetailById(
    @Param('id') id: string,
    @Param('pokemonMoveDetailId') pokemonMoveDetailId: string
  ): Promise<PokemonMoveDetailDto> {
    try {
      const pokemonMove: PokemonMoveDto = await this.findPokemonMoveById(id);

      if (null == pokemonMove) {
        throw new BadRequestException(
          `Cannot create pokemon move detail for pokemonMove with id #${id} because it does not exist`
        );
      }

      const pokemonMoveDetails: PokemonMoveDetailDocument = await this.pokemonMoveDetailService.find(
        pokemonMoveDetailId
      );

      return new PokemonMoveDetailDto(pokemonMoveDetails);
    } catch (error) {
      this.LOGGER.error(
        `Cannot get all pokemon move detail for pokemonMove with id #${id} because: ${error}`
      );
      throw new BadRequestException(error);
    }
  }

  private async findPokemonMoveById(id: string): Promise<PokemonMoveDto> {
    try {
      const pokemonMove: PokemonMoveDocument = await this.pokemonMoveService.find(
        id
      );

      return new PokemonMoveDto(pokemonMove);
    } catch (error) {
      this.LOGGER.error(
        `Cannot find pokemonMove by its id ${id} because: ${error}`
      );
      throw new BadRequestException(error);
    }
  }
}
