import { IGameVersion } from '@game-version/interface/game-version.interface';
import { ILocation } from '@location/interface/location.interface';

export interface IPokemonEncounter {
  name: string;
  gameVersion: IGameVersion;
  location: ILocation;
  // pokemon: IPokemon;
  method: string;
  chance: number;
  minLevel: number;
  maxLevel: number;
  maxChance: number;
}
