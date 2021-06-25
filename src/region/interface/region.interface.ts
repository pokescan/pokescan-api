import { IGeneration } from '@generation/interface/generation.inteface';
import { ITranslatableObject } from '@shared/interfaces/translatable-object.interface';

export interface IRegion {
  name: ITranslatableObject[];

  generation: IGeneration;
}
