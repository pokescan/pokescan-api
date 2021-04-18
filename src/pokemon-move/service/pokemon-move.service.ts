import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AbstractService } from '@shared/services/abstract/abstract.service';
import { Model } from 'mongoose';
import {
  PokemonMove,
  PokemonMoveDocument
} from '../schema/pokemon-move.schema';

@Injectable()
export class PokemonMoveService extends AbstractService<PokemonMoveDocument> {
  constructor(
    @InjectModel(PokemonMove.name) pokemonModel: Model<PokemonMoveDocument>
  ) {
    super(pokemonModel);
  }
}
