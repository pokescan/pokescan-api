import { IAbility } from '@ability/interface/ability.interface';
import { IGeneration } from '@generation/interface/generation.inteface';
import { IPokemonMove } from '@pokemon-move/interface/pokemon-move.interface';
import { IPokemonType } from '@pokemon-type/interface/pokemon-type.interface';
import { ITranslatableObject } from '@shared/interfaces/translatable-object.interface';
import { IPokemonStatObject } from './pokemon-stat-object.interface';

export interface IPokemon {
  name: ITranslatableObject[];
  pokedexId: string;
  weight: number;
  height: number;
  abilites: IAbility[];
  pokemonTypes: IPokemonType[];
  pokemonStats: IPokemonStatObject[];
  description: ITranslatableObject[];
  pokemonMoves: IPokemonMove[];
  cycle: number;
  step: number;
  captureRate: number;
  firstAppearenceGeneration: number;
  eggsGroup: string[];
  genderRepartition: IPokemonGenderRepartition;
  generation: IGeneration;
  previousPokemon: IPokemon;
  nextPokemon: IPokemon;
}

export interface IPokemonGenderRepartition {
  male: number;
  female: number;
}
