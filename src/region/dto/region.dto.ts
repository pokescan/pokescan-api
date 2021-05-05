import { GenerationDto } from '@generation/dto/generation.dto';
import { LocationDto } from '@location/dto/location.dto';
import { Field, ObjectType } from '@nestjs/graphql';
import { IRegion } from '@region/interface/region.interface';
import { CommonDto } from '@shared/models/common.dto';

@ObjectType()
export class RegionDto extends CommonDto {
  @Field({ description: 'Name of the region' })
  name: string;

  @Field(() => [LocationDto], {
    description: 'Locations that are related to the region'
  })
  locations: LocationDto[];

  @Field(() => GenerationDto, {
    description: 'Generated related to the region'
  })
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
