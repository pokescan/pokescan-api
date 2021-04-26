import { IGeneration } from '@generation/interface/generation.inteface';
import { ILocation } from '@location/interface/location.interface';

export interface IRegion {
  name: string;

  generation: IGeneration;

  locations: ILocation[];
}
