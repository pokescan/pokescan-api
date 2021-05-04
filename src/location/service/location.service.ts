import { LocationInputDto } from '@location/dto/location-input.dto';
import { Location, LocationDocument } from '@location/schema/location.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AbstractService } from '@shared/services/abstract/abstract.service';
import { Model } from 'mongoose';

@Injectable()
export class LocationService extends AbstractService<
  LocationDocument,
  LocationInputDto
> {
  constructor(
    @InjectModel(Location.name) locationModel: Model<LocationDocument>
  ) {
    super(locationModel);
  }
}
