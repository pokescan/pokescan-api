import { IAbility } from '@ability/interface/ability.interface';
import { Field, ObjectType } from '@nestjs/graphql';
import { CommonDto } from '@shared/models/common.dto';

@ObjectType()
export class AbilityDto extends CommonDto {
  @Field({ description: 'Name of the ability' })
  name: string;

  @Field({ description: 'Description of the ability' })
  description: string;

  constructor(language: string, model?: IAbility) {
    super(model);

    if (model) {
      this.name = super.getValueAccordingToLanguage(language, model.name);
      this.description = super.getValueAccordingToLanguage(
        language,
        model.description
      );
    }
  }
}
