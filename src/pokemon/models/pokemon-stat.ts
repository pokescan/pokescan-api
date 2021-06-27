import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType('PokemonStatObjectInput')
@ObjectType('PokemonStatObjectOutput')
export class PokemonStatObject {
  @IsString()
  @IsNotEmpty()
  @Field({ description: 'Label of the variable for this Pokemon Stat' })
  label: string;

  @IsNumber()
  @IsNotEmpty()
  @Field(() => Int, {
    description: 'Value of the variable for this Pokemon Stat'
  })
  value: number;
}
