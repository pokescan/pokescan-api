import { IGeneration } from '@generation/interface/generation.inteface';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CommonDto } from '@shared/models/common.dto';

@ObjectType()
export class GenerationDto extends CommonDto {
  @Field(() => Int, { description: 'The order of the generation' })
  order: number;

  constructor(model?: IGeneration) {
    super(model);

    if (model) {
      this.order = model.order;
    }
  }
}
