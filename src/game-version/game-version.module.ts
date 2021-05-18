import { GenerationModule } from '@generation/generation.module';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GameVersionResolver } from './resolvers/game-version.resolver';
import { GameVersion, GameVersionSchema } from './schema/game-version.schema';
import { GameVersionService } from './service/game-version.service';

@Module({
  imports: [
    forwardRef(() => GenerationModule),
    MongooseModule.forFeature([
      { name: GameVersion.name, schema: GameVersionSchema }
    ])
  ],
  providers: [GameVersionResolver, GameVersionService],
  exports: [GameVersionService]
})
export class GameVersionModule {}
