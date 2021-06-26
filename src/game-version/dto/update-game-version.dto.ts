import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateGameVersionDto } from './create-game-version.dto';

@InputType()
export class UpdateGameVersionDto extends PartialType(CreateGameVersionDto) {
  @IsString()
  @IsNotEmpty()
  @Field({ description: 'Id of the game version to update' })
  id: string;
}
