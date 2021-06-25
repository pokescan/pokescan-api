import { GenerationDto } from '@generation/dto/generation.dto';
import { Field, ObjectType } from '@nestjs/graphql';
import { IRegion } from '@region/interface/region.interface';
import { CommonDto } from '@shared/models/common.dto';
import { TranslatableObject } from '@shared/models/translatable';

@ObjectType()
export class RegionDto extends CommonDto {
  @Field(() => [TranslatableObject], {
    description: 'Name of the region'
  })
  name: TranslatableObject[];

  @Field(() => GenerationDto, {
    description: 'Generated related to the region'
  })
  generation: GenerationDto;

  constructor(model?: IRegion) {
    super(model);

    if (model) {
      this.name = model.name;
      this.generation = model.generation;
    }
  }
}
