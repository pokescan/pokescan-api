import { ILocation } from '@location/interface/location.interface';
import { Field, ObjectType } from '@nestjs/graphql';
import { RegionDto } from '@region/dto/region.dto';
import { CommonDto } from '@shared/models/common.dto';
import { TranslatableObject } from '@shared/models/translatable';

@ObjectType()
export class LocationDto extends CommonDto {
  @Field(() => [TranslatableObject], {
    description: 'Name of the location'
  })
  name: TranslatableObject[];

  @Field({ description: 'Region of the location' })
  region: RegionDto;

  constructor(model?: ILocation) {
    super(model);

    if (model) {
      this.name = model.name;
      this.region = model.region;
    }
  }
}
