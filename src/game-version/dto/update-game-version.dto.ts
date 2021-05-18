import { Field, InputType, OmitType } from '@nestjs/graphql';
import { CreateGameVersionDto } from './create-game-version.dto';

@InputType()
export class UpdateGameVersionDto extends OmitType(CreateGameVersionDto, [
  'name'
] as const) {
  @Field()
  id: string;
}
