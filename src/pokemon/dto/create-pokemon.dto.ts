import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { PokemonGenderRepartitionObject } from '@pokemon/models/pokemon-gender-repartition';
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

  @IsNumber()
  @IsNotEmpty()
  @Field(() => Int)
  pokedexId: number;

  @IsNumber()
  @IsNotEmpty()
  @Field(() => Float)
  weight: number;

  @IsNumber()
  @IsNotEmpty()
  @Field(() => Float)
  height: number;

  @IsArray()
  @IsNotEmpty()
  @Field(() => [String])
  abilities: string[];

  @IsArray()
  @IsNotEmpty()
  @Field(() => [String])
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
  @Field(() => [String])
  pokemonMoves: string[];

  @IsNumber()
  @IsNotEmpty()
  @Field(() => Int)
  cycle: number;

  @IsNumber()
  @IsNotEmpty()
  @Field(() => Float)
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
  @Field(() => [String])
  eggsGroup: string[];

  @IsObject()
  @IsNotEmpty()
  @Type(() => PokemonGenderRepartitionObject)
  @Field(() => PokemonGenderRepartitionObject, {
    description:
      'Gender reparition of the pokemon, multiple languages supported'
  })
  genderRepartition: PokemonGenderRepartitionObject;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  generation: string;

  @Field({ nullable: true })
  previousPokemon: string;

  @Field({ nullable: true })
  nextPokemon: string;
}
