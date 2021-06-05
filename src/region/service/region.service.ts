import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateRegionDto } from '@region/dto/create-region.dto';
import { Region, RegionDocument } from '@region/schema/region.schema';
import { AbstractService } from '@shared/services/abstract/abstract.service';
import { Model } from 'mongoose';

@Injectable()
export class RegionService extends AbstractService<
  RegionDocument,
  CreateRegionDto
> {
  constructor(@InjectModel(Region.name) regionModel: Model<RegionDocument>) {
    super(regionModel);
  }
}
