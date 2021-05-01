import { AbilityInputDto } from '@ability/dto/ability-input.dto';
import { Ability, AbilityDocument } from '@ability/schema/ability.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AbstractService } from '@shared/services/abstract/abstract.service';
import { Model } from 'mongoose';

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
