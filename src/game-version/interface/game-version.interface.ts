import { IGeneration } from '@generation/interface/generation.inteface';

export interface IGameVersion {
  name: string;
  imageUrl: string;
  generation: IGeneration;
}
