import { IGeneration } from '@generation/interface/generation.inteface';
import { CommonDto } from '@shared/models/common.dto';

export class GenerationDto extends CommonDto {
  order: number;

  constructor(model?: IGeneration) {
    super(model);

    if (model) {
      this.order = model.order;
    }
  }
}
