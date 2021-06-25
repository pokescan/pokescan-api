import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './schema/pokemon.schema';
import { PokemonService } from './service/pokemon/pokemon.service';
import { PokemonResolver } from './resolvers/pokemon/pokemon.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pokemon.name, schema: PokemonSchema }])
  ],
  providers: [PokemonService, PokemonResolver],
  exports: [PokemonService]
})
export class PokemonModule {}
