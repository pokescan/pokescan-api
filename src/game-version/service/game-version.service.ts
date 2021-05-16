import { CreateGameVersionDto } from '@game-version/dto/create-game-version.dto';
import {
  GameVersion,
  GameVersionDocument
} from '@game-version/schema/game-version.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AbstractService } from '@shared/services/abstract/abstract.service';
import { Model } from 'mongoose';

@Injectable()
export class GameVersionService extends AbstractService<
  GameVersionDocument,
  CreateGameVersionDto
> {
  constructor(
    @InjectModel(GameVersion.name)
    gameVersionModel: Model<GameVersionDocument>
  ) {
    super(gameVersionModel);
  }
}
