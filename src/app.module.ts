import { AbilityModule } from '@ability/ability.module';
import { GameVersionModule } from '@game-version/game-version.module';
import { GenerationModule } from '@generation/generation.module';
import { LocationModule } from '@location/location.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonMoveDetailModule } from '@pokemon-move-detail/pokemon-move-detail.module';
import { PokemonMoveModule } from '@pokemon-move/pokemon-move.module';
import { PokemonTypeModule } from '@pokemon-type/pokemon-type.module';
import { PokemonModule } from '@pokemon/pokemon.module';
import { RegionModule } from '@region/region.module';
import { SharedModule } from '@shared/shared.module';
import { EggGroupModule } from './egg-group/egg-group.module';
import { PokemonEncounterModule } from './pokemon-encounter/pokemon-encounter.module';

@Module({
  imports: [
    SharedModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectionFactory: connection => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        connection.plugin(require('mongoose-autopopulate'));
        return connection;
      }
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema/schema.gql',
      debug: true,
      playground: true,
      introspection: true
    }),
    AbilityModule,
    PokemonModule,
    PokemonMoveModule,
    PokemonMoveDetailModule,
    PokemonTypeModule,
    RegionModule,
    LocationModule,
    GenerationModule,
    GameVersionModule,
    EggGroupModule,
    PokemonEncounterModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
