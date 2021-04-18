import { PartialType } from '@nestjs/mapped-types';
import { CreatePokemonMoveDetailDto } from './create-pokemon-move-detail.dto';

export class UpdatePokemonMoveDetailDto extends PartialType(CreatePokemonMoveDetailDto) {}
