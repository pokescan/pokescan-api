import { Field, ID, ObjectType } from '@nestjs/graphql';
import { DEFAULT_LANGUAGE } from '@shared/constants';
import { ITranslatableObject } from '@shared/interfaces/translatable-object.interface';

@ObjectType()
export class CommonDto {
  @Field(() => ID, { description: 'Id of the object' })
  id?: string;

  @Field(() => String, { description: 'Latest update date for object' })
  updatedAt?: string;

  @Field(() => String, { description: 'Creation date for object' })
  createdAt?: string;

  constructor(model?: any) {
    if (model) {
      this.id = model._id;
      this.updatedAt = model.updatedAt;
      this.createdAt = model.createdAt;
    }
  }

  protected getValueAccordingToLanguage?(
    language: string,
    values: ITranslatableObject[]
  ): string {
    const translation = values.find(value => value.key === language);

    const defaultTranslation = values.find(
      value => value.key === DEFAULT_LANGUAGE
    );

    return (translation || defaultTranslation).value;
  }
}
