import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AbstractService } from '@shared/services/abstract/abstract.service';
import { Model } from 'mongoose';
import { AbilityInputDto } from '../dto/ability-input.dto';
import { Ability, AbilityDocument } from '../schema/ability.schema';

@Injectable()
export class AbilityService extends AbstractService<
  AbilityDocument,
  AbilityInputDto
> {
  constructor(
    @InjectModel(Ability.name)
    abilityModel: Model<AbilityDocument>
  ) {
    super(abilityModel);
  }
}
