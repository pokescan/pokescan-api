import { Module } from '@nestjs/common';
import { registerEnumType } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { Damage } from './enum/damage.enum';
import { LearnMethod } from './enum/learn-method.enum';
import {
  PokemonMoveDetail,
  PokemonMoveDetailSchema
} from './schema/pokemon-move-detail.schema';
import { PokemonMoveDetailService } from './service/pokemon-move-detail.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PokemonMoveDetail.name, schema: PokemonMoveDetailSchema }
    ])
  ],
  providers: [PokemonMoveDetailService],
  exports: [PokemonMoveDetailService]
})
export class PokemonMoveDetailModule {
  onModuleInit(): void {
    registerEnumType(Damage, { name: 'Damage' });
    registerEnumType(LearnMethod, { name: 'LearnMethod' });
  }
}
