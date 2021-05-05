import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationResolver } from './resolvers/location.resolver';
import { Location, LocationSchema } from './schema/location.schema';
import { LocationService } from './service/location.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Location.name, schema: LocationSchema }])
  ],
  providers: [LocationService, LocationResolver]
})
export class LocationModule {}
