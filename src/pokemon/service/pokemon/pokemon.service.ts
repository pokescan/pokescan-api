import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePokemonMoveDto } from '@pokemon-move/dto/create-pokemon-move.dto';
import { AbstractService } from '@shared/services/abstract/abstract.service';
import { Model } from 'mongoose';
import { Pokemon, PokemonDocument } from 'src/pokemon/schema/pokemon.schema';

@Injectable()
export class PokemonService extends AbstractService<
  PokemonDocument,
  CreatePokemonMoveDto
> {
  constructor(@InjectModel(Pokemon.name) pokemonModel: Model<PokemonDocument>) {
    super(pokemonModel);
  }
}
