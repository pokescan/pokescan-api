import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationController } from './controller/location.controller';
import { Location, LocationSchema } from './schema/location.schema';
import { LocationService } from './service/location.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Location.name, schema: LocationSchema }])
  ],
  controllers: [LocationController],
  providers: [LocationService]
})
export class LocationModule {}
