import { CommonDto } from '@shared/models/common.dto';
import { IPokemonMove } from '../interface/pokemon-move.interface';

export class PokemonMoveDto extends CommonDto {
  name: string;
  description: string;
  moveDetails: unknown;

  constructor(model?: IPokemonMove) {
    super(model);

    if (model) {
      this.name = model.name;
      this.description = model.description;
    }
  }
}
