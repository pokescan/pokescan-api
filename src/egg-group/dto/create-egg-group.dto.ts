import { Field, InputType } from '@nestjs/graphql';
import { TranslatableObject } from '@shared/models/translatable';

@InputType()
export class CreateEggGroupDto {
  @Field(() => [TranslatableObject], {
    description: 'Name of the egg group'
  })
  name: TranslatableObject[];
}
