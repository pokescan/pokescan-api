import { Damage } from '@pokemon-move-detail/enum/damage.enum';
import { LearnMethod } from '@pokemon-move-detail/enum/learn-method.enum';
import { IPokemonMove } from '@pokemon-move/interface/pokemon-move.interface';
import { IPokemonType } from '@pokemon-type/interface/pokemon-type.interface';

export interface IPokemonMoveDetail {
  levelLearnedAt?: number;

  learnMethod?: LearnMethod;

  // version?: IGameVersion;

  pokemonMove?: IPokemonMove;

  pokemonType?: IPokemonType;

  accuracy?: number;

  pp?: number;

  power?: number;

  effect?: number;

  damage?: Damage;

  contestType?: number;

  contestCharm?: number;

  contestLocking?: number;
}
