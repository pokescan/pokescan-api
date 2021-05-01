import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonTypeModule } from '@pokemon-type/pokemon-type.module';
import {
  PokemonMoveDetail,
  PokemonMoveDetailSchema
} from './schema/pokemon-move-detail.schema';
import { PokemonMoveDetailService } from './service/pokemon-move-detail.service';

@Module({
  imports: [
    forwardRef(() => PokemonTypeModule),
    MongooseModule.forFeature([
      { name: PokemonMoveDetail.name, schema: PokemonMoveDetailSchema }
    ])
  ],
  providers: [PokemonMoveDetailService],
  exports: [PokemonMoveDetailService]
})
export class PokemonMoveDetailModule {}
