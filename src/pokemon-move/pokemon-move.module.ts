import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonMoveController } from './controller/pokemon-move.controller';
import { PokemonMove, PokemonMoveSchema } from './schema/pokemon-move.schema';
import { PokemonMoveService } from './service/pokemon-move.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PokemonMove.name, schema: PokemonMoveSchema }
    ])
  ],
  controllers: [PokemonMoveController],
  providers: [PokemonMoveService]
})
export class PokemonMoveModule {}
