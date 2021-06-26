import { Field, InputType, Int } from '@nestjs/graphql';
import { TranslatableObject } from '@shared/models/translatable';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested
} from 'class-validator';

@InputType()
export class CreatePokemonEncounter {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => TranslatableObject)
  @Field(() => [TranslatableObject], {
    description: 'Name of the encounter'
  })
  name: TranslatableObject[];

  @Field()
  @IsString()
  @IsNotEmpty()
  gameVersion: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  location: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  pokemon: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  method: string;

  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  chance: number;

  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  minLevel: number;

  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  maxLevel: number;

  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  maxChance: number;
}
