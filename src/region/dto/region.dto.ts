import { GenerationDto } from '@generation/dto/generation.dto';
import { LocationDto } from '@location/dto/location.dto';
import { IRegion } from '@region/interface/region.interface';
import { CommonDto } from '@shared/models/common.dto';

export class RegionDto extends CommonDto {
  name: string;

  locations: LocationDto[];

  generation: GenerationDto;

  constructor(model?: IRegion) {
    super(model);

    if (model) {
      this.name = model.name;
      this.locations = model.locations;
      this.generation = model.generation;
    }
  }
}
