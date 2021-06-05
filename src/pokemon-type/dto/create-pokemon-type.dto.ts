import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreatePokemonTypeDto {
  @IsString()
  @IsNotEmpty()
  @Field({ description: 'Name of the pokemon type' })
  name!: string;
}
