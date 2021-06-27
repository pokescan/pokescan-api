import { Field, Float, InputType, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

@InputType('PokemonGenderRepartitionObjectInput')
@ObjectType('PokemonGenderRepartitionObjectOutput')
export class PokemonGenderRepartitionObject {
  @IsNumber()
  @IsNotEmpty()
  @Field(() => Float, { description: 'Male pokemon' })
  male: number;

  @IsNumber()
  @IsNotEmpty()
  @Field(() => Float, { description: 'Female pokemon' })
  female: number;
}
