import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AbilityController } from './controller/ability.controller';
import { Ability, AbilitySchema } from './schema/ability.schema';
import { AbilityService } from './service/ability.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Ability.name, schema: AbilitySchema }])
  ],
  controllers: [AbilityController],
  providers: [AbilityService]
})
export class AbilityModule {}
