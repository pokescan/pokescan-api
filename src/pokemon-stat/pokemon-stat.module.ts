import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonStatController } from './controller/pokemon-stat.controller';
import { PokemonStat, PokemonStatSchema } from './schema/pokemon-stat.schema';
import { PokemonStatService } from './service/pokemon-stat.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PokemonStat.name, schema: PokemonStatSchema }
    ])
  ],
  controllers: [PokemonStatController],
  providers: [PokemonStatService]
})
export class PokemonStatModule {}
