import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateEggGroupDto } from './create-egg-group.dto';

@InputType()
export class UpdateEggGroupDto extends PartialType(CreateEggGroupDto) {
  @Field({ description: 'Id of the egg group' })
  id: string;
}
