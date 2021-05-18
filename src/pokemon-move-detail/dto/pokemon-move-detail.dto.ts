import { GameVersionDto } from '@game-version/dto/game-version.dto';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Damage } from '@pokemon-move-detail/enum/damage.enum';
import { LearnMethod } from '@pokemon-move-detail/enum/learn-method.enum';
import { IPokemonMoveDetail } from '@pokemon-move-detail/interface/pokemon-move-detail.interface';
import { PokemonMoveDto } from '@pokemon-move/dto/pokemon-move.dto';
import { PokemonTypeDto } from '@pokemon-type/dto/pokemon-type.dto';
import { CommonDto } from '@shared/models/common.dto';

@ObjectType()
export class PokemonMoveDetailDto extends CommonDto {
  @Field(() => Int)
  levelLearnedAt?: number;

  @Field(() => LearnMethod)
  learnMethod?: LearnMethod;

  @Field(() => GameVersionDto)
  version?: GameVersionDto;

  @Field(() => PokemonMoveDto)
  pokemonMove?: PokemonMoveDto;

  @Field(() => PokemonTypeDto)
  pokemonType?: PokemonTypeDto;

  @Field(() => Int)
  accuracy?: number;

  @Field(() => Int)
  pp?: number;

  @Field(() => Int)
  power?: number;

  @Field(() => Int)
  effect?: number;

  @Field(() => Damage)
  damage?: Damage;

  @Field(() => Int)
  contestType?: number;

  @Field(() => Int)
  contestCharm?: number;

  @Field(() => Int)
  contestLocking?: number;

  constructor(model?: IPokemonMoveDetail) {
    super(model);

    if (model) {
      this.levelLearnedAt = model.levelLearnedAt;
      this.learnMethod = model.learnMethod;
      this.version = model.version;
      this.pokemonMove = model.pokemonMove;
      this.pokemonType = model.pokemonType;
      this.accuracy = model.accuracy;
      this.pp = model.pp;
      this.power = model.power;
      this.effect = model.effect;
      this.damage = model.damage;
      this.contestType = model.contestType;
      this.contestCharm = model.contestCharm;
      this.contestLocking = model.contestLocking;
    }
  }
}
