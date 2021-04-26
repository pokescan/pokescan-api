import { IsNotEmpty, IsNumber } from 'class-validator';

export class GenerationInputDto {
  @IsNumber()
  @IsNotEmpty()
  order: number;
}
