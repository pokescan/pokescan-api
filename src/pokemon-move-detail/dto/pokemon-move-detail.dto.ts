import { LearnMethod } from '@pokemon-move-detail/enum/learn-method.enum';
import { IPokemonMoveDetail } from '@pokemon-move-detail/interface/pokemon-move-detail.interface';
import { PokemonMoveDto } from '@pokemon-move/dto/pokemon-move.dto';
import { PokemonTypeDto } from '@pokemon-type/dto/pokemon-type.dto';
import { CommonDto } from '@shared/models/common.dto';

export class PokemonMoveDetailDto extends CommonDto {
  levelLearnedAt?: number;

  learnMethod?: LearnMethod;

  // version?: GameVersionDto;

  pokemonMove?: PokemonMoveDto;

  pokemonType?: PokemonTypeDto;

  accuracy?: number;

  pp?: number;

  power?: number;

  effect?: number;

  damage?: number;

  contestType?: number;

  contestCharm?: number;

  contestLocking?: number;

  constructor(model?: IPokemonMoveDetail) {
    super(model);
  }
}
