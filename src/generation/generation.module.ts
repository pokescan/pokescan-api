import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GenerationResolver } from './resolvers/generation.resolver';
import { Generation, GenerationSchema } from './schema/generation.schema';
import { GenerationService } from './service/generation.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Generation.name, schema: GenerationSchema }
    ])
  ],
  providers: [GenerationResolver, GenerationService]
})
export class GenerationModule {}
