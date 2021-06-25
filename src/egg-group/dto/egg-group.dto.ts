import { Field, ObjectType } from '@nestjs/graphql';
import { CommonDto } from '@shared/models/common.dto';
import { TranslatableObject } from '@shared/models/translatable';
import { IEggGroup } from '../interface/egg-group.interface';

@ObjectType()
export class EggGroupDto extends CommonDto {
  @Field(() => [TranslatableObject], {
    description: 'Name of the egg group'
  })
  name: TranslatableObject[];

  constructor(model?: IEggGroup) {
    super(model);

    if (model) {
      this.name = model.name;
    }
  }
}
