import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

@InputType('PokemonGenderRepartitionObjectInput')
@ObjectType('PokemonGenderRepartitionObjectOutput')
export class PokemonGenderRepartitionObject {
  @IsNumber()
  @IsNotEmpty()
  @Field(() => Int, { description: 'Male pokemon' })
  male: number;

  @IsNumber()
  @IsNotEmpty()
  @Field(() => Int, { description: 'Female pokemon' })
  female: number;
}
