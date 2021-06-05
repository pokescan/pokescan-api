import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePokemonTypeDto } from '@pokemon-type/dto/create-pokemon-type.dto';
import { AbstractService } from '@shared/services/abstract/abstract.service';
import { Model } from 'mongoose';
import {
  PokemonType,
  PokemonTypeDocument
} from '../schema/pokemon-type.schema';

@Injectable()
export class PokemonTypeService extends AbstractService<
  PokemonTypeDocument,
  CreatePokemonTypeDto
> {
  constructor(
    @InjectModel(PokemonType.name) pokemonTypeModel: Model<PokemonTypeDocument>
  ) {
    super(pokemonTypeModel);
  }
}
