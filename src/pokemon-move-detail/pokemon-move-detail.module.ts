import { Module } from '@nestjs/common';
import { PokemonMoveDetailService } from './pokemon-move-detail.service';
import { PokemonMoveDetailController } from './pokemon-move-detail.controller';

@Module({
  controllers: [PokemonMoveDetailController],
  providers: [PokemonMoveDetailService]
})
export class PokemonMoveDetailModule {}
