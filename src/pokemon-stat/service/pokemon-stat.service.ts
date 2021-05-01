import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AbstractService } from '@shared/services/abstract/abstract.service';
import { Model } from 'mongoose';
import {
  PokemonStat,
  PokemonStatDocument
} from '../schema/pokemon-stat.schema';

@Injectable()
export class PokemonStatService extends AbstractService<PokemonStatDocument> {
  constructor(
    @InjectModel(PokemonStat.name) pokemonStatModel: Model<PokemonStatDocument>
  ) {
    super(pokemonStatModel);
  }
}
