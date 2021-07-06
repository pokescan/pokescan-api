import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonModule } from '@pokemon/pokemon.module';
import { GenerationResolver } from './resolvers/generation.resolver';
import { Generation, GenerationSchema } from './schema/generation.schema';
import { GenerationService } from './service/generation.service';

@Module({
  imports: [
    forwardRef(() => PokemonModule),
    MongooseModule.forFeature([
      { name: Generation.name, schema: GenerationSchema }
    ])
  ],
  providers: [GenerationResolver, GenerationService],
  exports: [GenerationService]
})
export class GenerationModule {}
