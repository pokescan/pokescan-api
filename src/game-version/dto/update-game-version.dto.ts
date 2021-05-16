import { InputType, PartialType } from '@nestjs/graphql';
import { CreateGameVersionDto } from './create-game-version.dto';

@InputType()
export class UpdateGameVersionDto extends PartialType(CreateGameVersionDto) {}
