import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreatePokemonEncounter } from './create-pokemon-encounter.dto';

@InputType()
export class UpdatePokemonEncounter extends PartialType(
  CreatePokemonEncounter
) {
  @Field()
  id: string;
}
