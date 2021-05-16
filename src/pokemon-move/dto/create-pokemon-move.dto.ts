import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreatePokemonMoveDto {
  @IsString()
  @IsNotEmpty()
  @Field()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  description: string;
}
