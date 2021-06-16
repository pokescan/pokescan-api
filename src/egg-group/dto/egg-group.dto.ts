import { Field, ObjectType } from '@nestjs/graphql';
import { CommonDto } from '@shared/models/common.dto';
import { IEggGroup } from '../interface/egg-group.interface';

@ObjectType()
export class EggGroupDto extends CommonDto {
  @Field({ description: 'Name of the egg group' })
  name: string;

  constructor(model?: IEggGroup) {
    super(model);

    if (model) {
      this.name = model.name;
    }
  }
}
