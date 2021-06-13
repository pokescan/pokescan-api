import { IAbility } from '@ability/interface/ability.interface';
import { IGeneration } from '@generation/interface/generation.inteface';
import { IPokemonMove } from '@pokemon-move/interface/pokemon-move.interface';
import { IPokemonStat } from '@pokemon-stat/interface/pokemon-stat.interface';
import { IPokemonType } from '@pokemon-type/interface/pokemon-type.interface';

export interface IPokemon {
  name: string;
  pokedexId: string;
  weight: number;
  height: number;
  abilites: IAbility[];
  pokemonTypes: IPokemonType[];
  pokemonStats: IPokemonStat[];
  description: string;
  pokemonMoves: IPokemonMove[];
  cycle: string;
  step: string;
  captureRate: number;
  firstAppearenceGeneration: number;
  eggsGroup: string[];
  genderRepartition: IPokemonGenderRepartition;
  specy: string;
  generation: IGeneration;
  previousPokemon: IPokemon;
  nextPokemon: IPokemon;
}

export interface IPokemonGenderRepartition {
  male: number;
  female: number;
}
