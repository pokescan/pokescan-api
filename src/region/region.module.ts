import { LocationModule } from '@location/location.module';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RegionResolver } from './resolvers/region.resolver';
import { Region, RegionSchema } from './schema/region.schema';
import { RegionService } from './service/region.service';

@Module({
  imports: [
    forwardRef(() => LocationModule),
    MongooseModule.forFeature([{ name: Region.name, schema: RegionSchema }])
  ],
  providers: [RegionService, RegionResolver]
})
export class RegionModule {}
