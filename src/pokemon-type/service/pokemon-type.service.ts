import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AbstractService } from '@shared/services/abstract/abstract.service';
import { Model } from 'mongoose';
import {
  PokemonType,
  PokemonTypeDocument
} from '../schema/pokemon-type.schema';

@Injectable()
export class PokemonTypeService extends AbstractService<PokemonTypeDocument> {
  constructor(
    @InjectModel(PokemonType.name) pokemonTypeModel: Model<PokemonTypeDocument>
  ) {
    super(pokemonTypeModel);
  }
}
