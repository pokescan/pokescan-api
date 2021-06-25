import { GameVersionDto } from '@game-version/dto/game-version.dto';
import { LocationDto } from '@location/dto/location.dto';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IPokemonEncounter } from '@pokemon-encounter/interface/pokemon-encounter.interface';
import { PokemonDto } from '@pokemon/dto/pokemon.dto';
import { CommonDto } from '@shared/models/common.dto';

@ObjectType()
export class PokemonEncounterDto extends CommonDto {
  @Field()
  name: string;

  @Field(() => GameVersionDto)
  gameVersion: GameVersionDto;

  @Field(() => LocationDto)
  location: LocationDto;

  @Field(() => PokemonDto)
  pokemon: PokemonDto;

  @Field()
  method: string;

  @Field(() => Int)
  chance: number;

  @Field(() => Int)
  minLevel: number;

  @Field(() => Int)
  maxLevel: number;

  @Field(() => Int)
  maxChance: number;

  constructor(model?: IPokemonEncounter) {
    super(model);

    if (model) {
      this.name = model.name;
      this.gameVersion = model.gameVersion;
      this.location = model.location;
      // this.pokemon = model.pokemon;
      this.method = model.method;
      this.chance = model.chance;
      this.minLevel = model.minLevel;
      this.maxLevel = model.maxLevel;
      this.maxChance = model.maxChance;
    }
  }
}
