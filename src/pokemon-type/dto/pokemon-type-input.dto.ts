import { IsNotEmpty, IsString } from 'class-validator';

export class PokemonTypeInputDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
}
