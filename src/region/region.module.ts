import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RegionController } from './controller/region.controller';
import { Region, RegionSchema } from './schema/region.schema';
import { RegionService } from './service/region.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Region.name, schema: RegionSchema }])
  ],
  controllers: [RegionController],
  providers: [RegionService]
})
export class RegionModule {}
