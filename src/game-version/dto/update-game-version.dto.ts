import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateGameVersionDto } from './create-game-version.dto';

@InputType()
export class UpdateGameVersionDto extends PartialType(CreateGameVersionDto) {
  @Field({ description: 'Id of the game version to update' })
  id: string;
}
