import { IsNotEmpty, IsString } from 'class-validator';

export class PokemonMoveInputDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
