import { AbilityModule } from '@ability/ability.module';
import { GenerationModule } from '@generation/generation.module';
import { LocationModule } from '@location/location.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RegionModule } from '@region/region.module';
import { SharedModule } from '@shared/shared.module';
import { PokemonMoveDetailModule } from './pokemon-move-detail/pokemon-move-detail.module';
import { PokemonMoveModule } from './pokemon-move/pokemon-move.module';
import { PokemonStatModule } from './pokemon-stat/pokemon-stat.module';
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
    PokemonTypeModule,
    RegionModule,
    LocationModule,
    GenerationModule,
    PokemonStatModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
