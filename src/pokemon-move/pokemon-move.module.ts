import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonMoveDetailModule } from '@pokemon-move-detail/pokemon-move-detail.module';
import { PokemonTypeModule } from '@pokemon-type/pokemon-type.module';
import { PokemonMoveResolver } from './resolvers/pokemon-move.resolver';
import { PokemonMove, PokemonMoveSchema } from './schema/pokemon-move.schema';
import { PokemonMoveService } from './service/pokemon-move.service';

@Module({
  imports: [
    forwardRef(() => PokemonMoveDetailModule),
    forwardRef(() => PokemonTypeModule),
    MongooseModule.forFeature([
      { name: PokemonMove.name, schema: PokemonMoveSchema }
    ])
  ],
  providers: [PokemonMoveService, PokemonMoveResolver]
})
export class PokemonMoveModule {}
