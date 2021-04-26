import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from '@shared/shared.module';
import { AbilityModule } from './ability/ability.module';
import { PokemonMoveDetailModule } from './pokemon-move-detail/pokemon-move-detail.module';
import { PokemonMoveModule } from './pokemon-move/pokemon-move.module';
import { PokemonTypeModule } from './pokemon-type/pokemon-type.module';

@Module({
  imports: [
    SharedModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }),
    AbilityModule,
    PokemonMoveModule,
    PokemonMoveDetailModule,
    PokemonTypeModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
