import { IAbility } from '@ability/interface/ability.interface';
import { Field, ObjectType } from '@nestjs/graphql';
import { CommonDto } from '@shared/models/common.dto';
import { TranslatableObject } from '@shared/models/translatable';

@ObjectType()
export class AbilityDto extends CommonDto {
  @Field(() => [TranslatableObject], {
    description: 'Name of the ability'
  })
  name: TranslatableObject[];

  @Field(() => [TranslatableObject], {
    description: 'Description of the ability'
  })
  description: TranslatableObject[];

  constructor(model?: IAbility) {
    super(model);

    if (model) {
      this.name = model.name;
      this.description = model.description;
    }
  }
}
