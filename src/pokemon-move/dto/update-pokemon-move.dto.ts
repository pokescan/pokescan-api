import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UpdatePokemonMoveDto {
  @IsString()
  @IsNotEmpty()
  @Field()
  description: string;
}
