import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AbstractService } from '@shared/services/abstract/abstract.service';
import { Model } from 'mongoose';
import { CreateEggGroupDto } from '../dto/create-egg-group.dto';
import { EggGroup, EggGroupDocument } from '../schema/egg-group.schema';

@Injectable()
export class EggGroupService extends AbstractService<
  EggGroupDocument,
  CreateEggGroupDto
> {
  constructor(
    @InjectModel(EggGroup.name)
    eggGroupModel: Model<EggGroupDocument>
  ) {
    super(eggGroupModel);
  }
}
