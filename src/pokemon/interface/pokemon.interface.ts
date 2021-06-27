import { IAbility } from '@ability/interface/ability.interface';
import { IGeneration } from '@generation/interface/generation.inteface';
import { IPokemonMove } from '@pokemon-move/interface/pokemon-move.interface';
import { IPokemonType } from '@pokemon-type/interface/pokemon-type.interface';
import { ITranslatableObject } from '@shared/interfaces/translatable-object.interface';
import { IEggGroup } from 'src/egg-group/interface/egg-group.interface';
import { IPokemonGenderRepartitonObject } from './pokemon-gender-repartition.interface';
import { IPokemonStatObject } from './pokemon-stat-object.interface';

export interface IPokemon {
  name: ITranslatableObject[];
  pokedexId: number;
  weight: number;
  height: number;
  abilities: IAbility[];
  pokemonTypes: IPokemonType[];
  pokemonStats: IPokemonStatObject[];
  description: ITranslatableObject[];
  pokemonMoves: IPokemonMove[];
  cycle: number;
  step: number;
  captureRate: number;
  firstAppearenceGeneration: IGeneration;
  eggsGroup: IEggGroup[];
  genderRepartition: IPokemonGenderRepartitonObject;
  generation: IGeneration;
  previousPokemon: IPokemon;
  nextPokemon: IPokemon;
}
