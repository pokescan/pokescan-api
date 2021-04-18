import { AbilityInterface } from '@ability/interface/ability.interface';
import { CommonDto } from '@shared/models/common.dto';

export class AbilityDto extends CommonDto {
  name?: string;

  constructor(model?: AbilityInterface) {
    super(model);

    if (model) {
      this.name = model.name;
    }
  }
}
