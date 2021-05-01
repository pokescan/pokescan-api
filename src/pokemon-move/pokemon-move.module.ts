import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonMoveDetailModule } from '@pokemon-move-detail/pokemon-move-detail.module';
import { PokemonMoveController } from './controller/pokemon-move.controller';
import { PokemonMove, PokemonMoveSchema } from './schema/pokemon-move.schema';
import { PokemonMoveService } from './service/pokemon-move.service';

@Module({
  imports: [
    forwardRef(() => PokemonMoveDetailModule),
    MongooseModule.forFeature([
      { name: PokemonMove.name, schema: PokemonMoveSchema }
    ])
  ],
  controllers: [PokemonMoveController],
  providers: [PokemonMoveService]
})
export class PokemonMoveModule {}
