import { AbilityDto } from '@ability/dto/ability.dto';
import { GenerationDto } from '@generation/dto/generation.dto';
import { Field, Int } from '@nestjs/graphql';
import { PokemonMoveDto } from '@pokemon-move/dto/pokemon-move.dto';
import { PokemonTypeDto } from '@pokemon-type/dto/pokemon-type.dto';
import { IPokemonGenderRepartition } from '@pokemon/interface/pokemon.interface';
import { PokemonStatObject } from '@pokemon/models/pokemon-stat';
import { CommonDto } from '@shared/models/common.dto';
import { TranslatableObject } from '@shared/models/translatable';
import { IsArray } from 'class-validator';

export class PokemonDto extends CommonDto {
  @Field(() => [TranslatableObject], {
    description: 'Name of the pokemon'
  })
  name: TranslatableObject[];

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
  @Field(() => [PokemonStatObject])
  pokemonStats: PokemonStatObject[];

  @Field(() => [TranslatableObject], {
    description: 'Description of the pokemon'
  })
  description: TranslatableObject[];

  @IsArray()
  @Field(() => PokemonMoveDto)
  pokemonMoves: PokemonMoveDto[];

  @Field({ description: 'Cycle of the pokemon' })
  cycle: number;

  @Field({ description: 'Step of the pokemon' })
  step: number;

  @Field(() => Int)
  captureRate: number;

  @Field(() => Int)
  firstAppearenceGeneration: number;

  @IsArray()
  @Field(() => Int)
  eggsGroup: number[];

  @Field()
  genderRepartition: IPokemonGenderRepartition;

  @Field(() => GenerationDto)
  generation: GenerationDto;

  @Field(() => PokemonDto)
  previousPokemon: PokemonDto;

  @Field(() => PokemonDto)
  nextPokemon: PokemonDto;
}
