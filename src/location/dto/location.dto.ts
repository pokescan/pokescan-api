import { ILocation } from '@location/interface/location.interface';
import { Field, ObjectType } from '@nestjs/graphql';
import { CommonDto } from '@shared/models/common.dto';

@ObjectType()
export class LocationDto extends CommonDto {
  @Field({ description: 'Name of the location' })
  name: string;

  constructor(model?: ILocation) {
    super(model);

    if (model) {
      this.name = model.name;
    }
  }
}
