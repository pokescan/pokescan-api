import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonStat, PokemonStatSchema } from './schema/pokemon-stat.schema';
import { PokemonStatService } from './service/pokemon-stat.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PokemonStat.name, schema: PokemonStatSchema }
    ])
  ],
  providers: [PokemonStatService]
})
export class PokemonStatModule {}
