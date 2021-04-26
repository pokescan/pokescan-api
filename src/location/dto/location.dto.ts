import { ILocation } from '@location/interface/location.interface';
import { CommonDto } from '@shared/models/common.dto';

export class LocationDto extends CommonDto {
  name: string;

  constructor(model?: ILocation) {
    super(model);

    if (model) {
      this.name = model.name;
    }
  }
}
