import { IsNotEmpty, IsString } from 'class-validator';

export class PokemonStatInputDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  value: string;
}
