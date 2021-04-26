import { IAbility } from '@ability/interface/ability.interface';
import { CommonDto } from '@shared/models/common.dto';

export class AbilityDto extends CommonDto {
  name!: string;
  description!: string;

  constructor(model?: IAbility) {
    super(model);

    if (model) {
      this.name = model.name;
      this.description = model.description;
    }
  }
}
