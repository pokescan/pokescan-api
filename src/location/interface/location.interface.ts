import { IRegion } from '@region/interface/region.interface';
import { TranslatableObject } from '@shared/models/translatable';

export interface ILocation {
  name: TranslatableObject[];
  region: IRegion;
}
