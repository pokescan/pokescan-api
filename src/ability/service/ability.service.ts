import { Ability, AbilityDocument } from '@ability/entities/ability.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AbstractService } from '@shared/services/abstract/abstract.service';
import { Model } from 'mongoose';

@Injectable()
export class AbilityService extends AbstractService<AbilityDocument> {
  constructor(
    @InjectModel(Ability.name)
    private readonly abilityModel: Model<AbilityDocument>
  ) {
    super(abilityModel);
  }
}
