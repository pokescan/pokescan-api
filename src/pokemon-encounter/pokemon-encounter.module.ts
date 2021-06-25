import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonEncounterResolver } from './resolver/pokemon-encounter.resolver';
import {
  PokemonEncounter,
  PokemonEncounterSchema
} from './schema/pokemon-encounter.schema';
import { PokemonEncounterService } from './service/pokemon-encounter.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PokemonEncounter.name, schema: PokemonEncounterSchema }
    ])
  ],
  providers: [PokemonEncounterResolver, PokemonEncounterService]
})
export class PokemonEncounterModule {}
