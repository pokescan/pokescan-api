import { IGameVersion } from '@game-version/interface/game-version.interface';
import { ILocation } from '@location/interface/location.interface';
import { TranslatableObject } from '@shared/models/translatable';

export interface IPokemonEncounter {
  name: TranslatableObject[];
  gameVersion: IGameVersion;
  location: ILocation;
  // pokemon: IPokemon;
  method: string;
  chance: number;
  minLevel: number;
  maxLevel: number;
  maxChance: number;
}
