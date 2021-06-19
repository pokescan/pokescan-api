import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreatePokemonMoveDetailDto } from './create-pokemon-move-detail.dto';

@InputType()
export class UpdatePokemonMoveDetailDto extends PartialType(
  CreatePokemonMoveDetailDto
) {
  @Field()
  @IsNotEmpty()
  @IsString()
  id: string;
}
