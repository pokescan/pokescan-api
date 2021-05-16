import { InputType, PartialType } from '@nestjs/graphql';
import { CreatePokemonMoveDetailDto } from './create-pokemon-move-detail.dto';

@InputType()
export class UpdatePokemonMoveDetailDto extends PartialType(
  CreatePokemonMoveDetailDto
) {}
