import { Field, InputType, Int } from '@nestjs/graphql';
import { IPokemonGenderRepartition } from '@pokemon/interface/pokemon.interface';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString
} from 'class-validator';

@InputType()
export class CreatePokemonDto {
  @IsString()
  @IsNotEmpty()
  @Field()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  pokedexId: string;

  @IsNumber()
  @IsNotEmpty()
  @Field(() => Int)
  weight: number;

  @IsNumber()
  @IsNotEmpty()
  @Field(() => Int)
  height: number;

  @IsArray()
  @IsNotEmpty()
  @Field(() => String)
  abilites: string[];

  @IsArray()
  @IsNotEmpty()
  @Field(() => String)
  pokemonTypes: string[];

  @IsArray()
  @IsNotEmpty()
  @Field(() => String)
  pokemonStats: string[];

  @IsString()
  @IsNotEmpty()
  @Field()
  description: string;

  @IsArray()
  @IsNotEmpty()
  @Field(() => String)
  pokemonMoves: string[];

  @IsString()
  @IsNotEmpty()
  @Field()
  cycle: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  step: string;

  @IsNumber()
  @IsNotEmpty()
  @Field(() => Int)
  captureRate: number;

  @IsNumber()
  @IsNotEmpty()
  @Field(() => Int)
  firstAppearenceGeneration: number;

  @IsArray()
  @IsNotEmpty()
  @Field(() => Int)
  eggsGroup: number[];

  @IsObject()
  @IsNotEmpty()
  @Field()
  genderRepartition: IPokemonGenderRepartition;

  @IsString()
  @IsNotEmpty()
  @Field()
  specy: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  generation: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  previousPokemon: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  nextPokemon: string;
}
