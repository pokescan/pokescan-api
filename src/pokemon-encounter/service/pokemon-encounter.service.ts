import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePokemonEncounter } from '@pokemon-encounter/dto/create-pokemon-encounter.dto';
import {
  PokemonEncounter,
  PokemonEncounterDocument
} from '@pokemon-encounter/schema/pokemon-encounter.schema';
import { AbstractService } from '@shared/services/abstract/abstract.service';
import { Model } from 'mongoose';

@Injectable()
export class PokemonEncounterService extends AbstractService<
  PokemonEncounterDocument,
  CreatePokemonEncounter
> {
  constructor(
    @InjectModel(PokemonEncounter.name)
    pokemonEncounterModel: Model<PokemonEncounterDocument>
  ) {
    super(pokemonEncounterModel);
  }
}
