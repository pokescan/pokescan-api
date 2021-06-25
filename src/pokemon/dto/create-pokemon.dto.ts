import { Field, InputType, Int } from '@nestjs/graphql';
import { IPokemonGenderRepartition } from '@pokemon/interface/pokemon.interface';
import { PokemonStatObject } from '@pokemon/models/pokemon-stat';
import { TranslatableObject } from '@shared/models/translatable';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested
} from 'class-validator';

@InputType()
export class CreatePokemonDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => TranslatableObject)
  @Field(() => [TranslatableObject], {
    description: 'Name of the pokemon, multiple languages supported'
  })
  name: TranslatableObject[];

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
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => PokemonStatObject)
  @Field(() => [PokemonStatObject], {
    description: 'Stats of the pokemon, multiple languages supported'
  })
  pokemonStats: PokemonStatObject[];

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => TranslatableObject)
  @Field(() => [TranslatableObject], {
    description: 'Description of the pokemon, multiple languages supported'
  })
  description: TranslatableObject[];

  @IsArray()
  @IsNotEmpty()
  @Field(() => String)
  pokemonMoves: string[];

  @IsNumber()
  @IsNotEmpty()
  @Field(() => Int)
  cycle: number;

  @IsNumber()
  @IsNotEmpty()
  @Field(() => Int)
  step: number;

  @IsNumber()
  @IsNotEmpty()
  @Field(() => Int)
  captureRate: number;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  firstAppearenceGeneration: string;

  @IsArray()
  @IsNotEmpty()
  @Field(() => String)
  eggsGroup: string[];

  @IsObject()
  @IsNotEmpty()
  @Field()
  genderRepartition: IPokemonGenderRepartition;

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
