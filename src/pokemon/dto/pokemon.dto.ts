import { AbilityDto } from '@ability/dto/ability.dto';
import { GenerationDto } from '@generation/dto/generation.dto';
import { Field, Int } from '@nestjs/graphql';
import { PokemonStatDto } from '@pokemon-stat/dto/pokemon-stat.dto';
import { PokemonStat } from '@pokemon-stat/schema/pokemon-stat.schema';
import { PokemonTypeDto } from '@pokemon-type/dto/pokemon-type.dto';
import { IPokemonGenderRepartition } from '@pokemon/interface/pokemon.interface';
import { CommonDto } from '@shared/models/common.dto';
import { IsArray } from 'class-validator';

export class PokemonDto extends CommonDto {
  @Field({ description: 'Name of the pokemon' })
  name: string;

  @Field({ description: 'Pokedex Id of the pokemon' })
  pokedexId: string;

  @Field(() => Int)
  weight: number;

  @Field(() => Int)
  height: number;

  @Field(() => AbilityDto)
  abilites: AbilityDto[];

  @IsArray()
  @Field(() => PokemonTypeDto)
  pokemonTypes: PokemonTypeDto[];

  @IsArray()
  @Field(() => PokemonStat)
  pokemonStats: PokemonStat[];

  @Field({ description: 'Description of the pokemon' })
  description: string;

  @IsArray()
  @Field(() => PokemonStatDto)
  pokemonMoves: PokemonStatDto[];

  @Field({ description: 'Cycle of the pokemon' })
  cycle: string;

  @Field({ description: 'Step of the pokemon' })
  step: string;

  @Field(() => Int)
  captureRate: number;

  @Field(() => Int)
  firstAppearenceGeneration: number;

  @IsArray()
  @Field(() => Int)
  eggsGroup: number[];

  @Field()
  genderRepartition: IPokemonGenderRepartition;

  @Field({ description: 'Specy of the pokemon' })
  specy: string;

  @Field(() => GenerationDto)
  generation: GenerationDto;

  @Field(() => PokemonDto)
  previousPokemon: PokemonDto;

  @Field(() => PokemonDto)
  nextPokemon: PokemonDto;
}
