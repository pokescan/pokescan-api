import { CommonDto } from '@shared/models/common.dto';
import { IPokemonType } from '../interface/pokemon-type.interface';

export class PokemonTypeDto extends CommonDto {
  name: string;

  constructor(model?: IPokemonType) {
    super(model);

    if (model) {
      this.name = model.name;
    }
  }
}
