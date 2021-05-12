import { IAbility } from '@ability/interface/ability.interface';
import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CommonDto } from '@shared/models/common.dto';

@ObjectType()
@ArgsType()
export class AbilityDto extends CommonDto {
  @Field({ description: 'Name of the ability' })
  name: string;

  @Field({ description: 'Description of the ability' })
  description: string;

  constructor(model?: IAbility) {
    super(model);

    if (model) {
      this.name = model.name;
      this.description = model.description;
    }
  }
}
