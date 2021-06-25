import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreatePokemonEncounter {
  @Field()
  name: string;

  @Field()
  gameVersion: string;

  @Field()
  location: string;

  @Field()
  pokemon: string;

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
}
