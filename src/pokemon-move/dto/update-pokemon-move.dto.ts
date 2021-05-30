import { Field, InputType, OmitType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreatePokemonMoveDto } from './create-pokemon-move.dto';

@InputType()
export class UpdatePokemonMoveDto extends OmitType(CreatePokemonMoveDto, [
  'name' as const
]) {
  @IsString()
  @IsNotEmpty()
  @Field()
  id: string;
}
