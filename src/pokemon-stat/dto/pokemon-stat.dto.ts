import { CommonDto } from '@shared/models/common.dto';
import { IPokemonStat } from '../interface/pokemon-stat.interface';

export class PokemonStatDto extends CommonDto {
  name: string;

  value: string;

  constructor(model?: IPokemonStat) {
    super(model);

    if (model) {
      this.name = model.name;
      this.value = model.value;
    }
  }
}
