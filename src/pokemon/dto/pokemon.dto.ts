import { AbilityDto } from '@ability/dto/ability.dto';
import { EggGroupDto } from '@egg-group/dto/egg-group.dto';
import { GenerationDto } from '@generation/dto/generation.dto';
import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { PokemonMoveDto } from '@pokemon-move/dto/pokemon-move.dto';
import { PokemonTypeDto } from '@pokemon-type/dto/pokemon-type.dto';
import { PokemonGenderRepartitionObject } from '@pokemon/models/pokemon-gender-repartition';
import { PokemonStatObject } from '@pokemon/models/pokemon-stat';
import { CommonDto } from '@shared/models/common.dto';
import { TranslatableObject } from '@shared/models/translatable';
import { IsArray } from 'class-validator';

@ObjectType()
export class PokemonDto extends CommonDto {
  @Field(() => [TranslatableObject], {
    description: 'Name of the pokemon'
  })
  name: TranslatableObject[];

  @Field(() => Int, { description: 'Pokedex Id of the pokemon' })
  pokedexId: number;

  @Field(() => Float)
  weight: number;

  @Field(() => Float)
  height: number;

  @Field(() => [AbilityDto])
  abilities: AbilityDto[];

  @IsArray()
  @Field(() => [PokemonTypeDto])
  pokemonTypes: PokemonTypeDto[];

  @IsArray()
  @Field(() => [PokemonStatObject])
  pokemonStats: PokemonStatObject[];

  @Field(() => [TranslatableObject], {
    description: 'Description of the pokemon'
  })
  description: TranslatableObject[];

  @IsArray()
  @Field(() => [PokemonMoveDto])
  pokemonMoves: PokemonMoveDto[];

  @Field(() => Int, { description: 'Cycle of the pokemon' })
  cycle: number;

  @Field(() => Int, { description: 'Step of the pokemon' })
  step: number;

  @Field(() => Int)
  captureRate: number;

  @Field(() => GenerationDto)
  firstAppearenceGeneration: GenerationDto;

  @IsArray()
  @Field(() => [EggGroupDto])
  eggsGroup: EggGroupDto[];

  @Field(() => PokemonGenderRepartitionObject)
  genderRepartition: PokemonGenderRepartitionObject;

  @Field(() => GenerationDto)
  generation: GenerationDto;

  @Field(() => PokemonDto, { nullable: true })
  previousPokemon: PokemonDto;

  @Field(() => PokemonDto, { nullable: true })
  nextPokemon: PokemonDto;
}
