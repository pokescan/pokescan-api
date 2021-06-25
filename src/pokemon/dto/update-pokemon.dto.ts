import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreatePokemonDto } from './create-pokemon.dto';

@InputType()
export class UpdatePokemonDto extends PartialType(CreatePokemonDto) {
  @IsString()
  @IsNotEmpty()
  @Field()
  id: string;
}
