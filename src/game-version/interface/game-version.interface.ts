import { IGeneration } from '@generation/interface/generation.inteface';
import { TranslatableObject } from '@shared/models/translatable';

export interface IGameVersion {
  name: TranslatableObject[];
  imageUrl: string;
  generation: IGeneration;
}
