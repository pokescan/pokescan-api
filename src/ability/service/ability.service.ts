import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AbstractService } from '@shared/services/abstract/abstract.service';
import { Model } from 'mongoose';
import { CreateAbilityDto } from '../dto/create-ability.dto';
import { Ability, AbilityDocument } from '../schema/ability.schema';

@Injectable()
export class AbilityService extends AbstractService<
  AbilityDocument,
  CreateAbilityDto
> {
  constructor(
    @InjectModel(Ability.name)
    abilityModel: Model<AbilityDocument>
  ) {
    super(abilityModel);
  }
}
