import { GenerationInputDto } from '@generation/dto/generation-input.dto';
import {
  Generation,
  GenerationDocument
} from '@generation/schema/generation.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AbstractService } from '@shared/services/abstract/abstract.service';
import { Model } from 'mongoose';

@Injectable()
export class GenerationService extends AbstractService<
  GenerationDocument,
  GenerationInputDto
> {
  constructor(
    @InjectModel(Generation.name) generationModel: Model<GenerationDocument>
  ) {
    super(generationModel);
  }
}
