import { Field, InputType, Int } from '@nestjs/graphql';
import { TranslatableObject } from '@shared/models/translatable';

@InputType()
export class CreatePokemonEncounter {
  @Field(() => [TranslatableObject], {
    description: 'Name of the encounter'
  })
  name: TranslatableObject[];

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
