import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GenerationController } from './controller/generation.controller';
import { Generation, GenerationSchema } from './schema/generation.schema';
import { GenerationService } from './service/generation.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Generation.name, schema: GenerationSchema }
    ])
  ],
  controllers: [GenerationController],
  providers: [GenerationService]
})
export class GenerationModule {}
