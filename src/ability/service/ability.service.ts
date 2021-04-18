import { Ability, AbilityDocument } from '@ability/entity/ability.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AbstractService } from '@shared/services/abstract/abstract.service';
import { Model } from 'mongoose';

@Injectable()
export class AbilityService extends AbstractService<AbilityDocument> {
  constructor(
    @InjectModel(Ability.name)
    abilityModel: Model<AbilityDocument>
  ) {
    super(abilityModel);
  }
}
