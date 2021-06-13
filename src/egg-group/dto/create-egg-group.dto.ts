import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateEggGroupDto {
  @Field({ description: 'Name of the egg group' })
  name: string;
}
