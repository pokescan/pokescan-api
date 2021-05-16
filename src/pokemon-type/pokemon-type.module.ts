import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonTypeResolver } from './resolvers/pokemon-type.resolver';
import { PokemonType, PokemonTypeSchema } from './schema/pokemon-type.schema';
import { PokemonTypeService } from './service/pokemon-type.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: PokemonType.name,
        schema: PokemonTypeSchema
      }
    ])
  ],
  providers: [PokemonTypeService, PokemonTypeResolver],
  exports: [PokemonTypeService]
})
export class PokemonTypeModule {}
