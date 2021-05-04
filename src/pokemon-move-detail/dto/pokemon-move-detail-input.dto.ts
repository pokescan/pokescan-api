import { Damage } from '@pokemon-move-detail/enum/damage.enum';
import { LearnMethod } from '@pokemon-move-detail/enum/learn-method.enum';
import { PokemonMoveDto } from '@pokemon-move/dto/pokemon-move.dto';
import { PokemonTypeDto } from '@pokemon-type/dto/pokemon-type.dto';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

export class PokemonMoveDetailInputDto {
  @IsNumber()
  @IsNotEmpty()
  levelLearnedAt?: number;

  @IsEnum(LearnMethod)
  @IsNotEmpty()
  learnMethod?: LearnMethod;

  // version?: GameVersionDto;

  @IsNotEmpty()
  pokemonType?: PokemonTypeDto;

  pokemonMove?: PokemonMoveDto;

  @IsNumber()
  @IsNotEmpty()
  accuracy?: number;

  @IsNumber()
  @IsNotEmpty()
  pp?: number;

  @IsNumber()
  @IsNotEmpty()
  power?: number;

  @IsNumber()
  @IsNotEmpty()
  effect?: number;

  @IsEnum(Damage)
  @IsNotEmpty()
  damage?: Damage;

  @IsNumber()
  @IsNotEmpty()
  contestType?: number;

  @IsNumber()
  @IsNotEmpty()
  contestCharm?: number;

  @IsNumber()
  @IsNotEmpty()
  contestLocking?: number;
}
