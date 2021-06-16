import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EggGroupResolver } from './resolver/egg-group.resolver';
import { EggGroup, EggGroupSchema } from './schema/egg-group.schema';
import { EggGroupService } from './service/egg-group.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: EggGroup.name, schema: EggGroupSchema }])
  ],
  providers: [EggGroupResolver, EggGroupService]
})
export class EggGroupModule {}
