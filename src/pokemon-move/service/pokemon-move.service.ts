import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PokemonMoveInputDto } from '@pokemon-move/dto/pokemon-move-input.dto';
import { AbstractService } from '@shared/services/abstract/abstract.service';
import { Model } from 'mongoose';
import {
  PokemonMove,
  PokemonMoveDocument
} from '../schema/pokemon-move.schema';

@Injectable()
export class PokemonMoveService extends AbstractService<
  PokemonMoveDocument,
  PokemonMoveInputDto
> {
  constructor(
    @InjectModel(PokemonMove.name) pokemonMoveModel: Model<PokemonMoveDocument>
  ) {
    super(pokemonMoveModel);
  }
}
