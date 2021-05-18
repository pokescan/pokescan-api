import { Field, InputType, Int } from '@nestjs/graphql';
import { Damage } from '@pokemon-move-detail/enum/damage.enum';
import { LearnMethod } from '@pokemon-move-detail/enum/learn-method.enum';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class CreatePokemonMoveDetailDto {
  @IsNumber()
  @IsNotEmpty()
  @Field(() => Int)
  levelLearnedAt?: number;

  @IsEnum(LearnMethod)
  @IsNotEmpty()
  @Field(() => LearnMethod)
  learnMethod?: LearnMethod;

  @IsNotEmpty()
  @Field()
  version: string;

  @IsNotEmpty()
  @Field()
  pokemonType: string;

  @Field({ nullable: true })
  pokemonMove?: string;

  @IsNumber()
  @IsNotEmpty()
  @Field(() => Int)
  accuracy?: number;

  @IsNumber()
  @IsNotEmpty()
  @Field(() => Int)
  pp?: number;

  @IsNumber()
  @IsNotEmpty()
  @Field(() => Int)
  power?: number;

  @IsNumber()
  @IsNotEmpty()
  @Field(() => Int)
  effect?: number;

  @IsEnum(Damage)
  @IsNotEmpty()
  @Field(() => Damage)
  damage?: Damage;

  @IsNumber()
  @IsNotEmpty()
  @Field(() => Int)
  contestType?: number;

  @IsNumber()
  @IsNotEmpty()
  @Field(() => Int)
  contestCharm?: number;

  @IsNumber()
  @IsNotEmpty()
  @Field(() => Int)
  contestLocking?: number;
}
