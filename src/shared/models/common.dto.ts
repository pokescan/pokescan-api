import { Field, ID, ObjectType } from '@nestjs/graphql';

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
}
