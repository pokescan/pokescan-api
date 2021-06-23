import { Field, ID, ObjectType } from '@nestjs/graphql';
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

  protected getValueAccordingToLanguage(
    language: string,
    variableName: string,
    values: ITranslatableObject[]
  ): string {
    return '';
  }
}
