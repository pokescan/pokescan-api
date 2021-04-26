import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonTypeController } from './controller/pokemon-type.controller';
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
  controllers: [PokemonTypeController],
  providers: [PokemonTypeService]
})
export class PokemonTypeModule {}
