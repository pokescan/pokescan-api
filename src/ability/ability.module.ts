import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AbilityController } from './controller/ability.controller';
import { Ability, AbilitySchema } from './entities/ability.entity';
import { AbilityService } from './service/ability.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Ability.name, schema: AbilitySchema }])
  ],
  controllers: [AbilityController],
  providers: [AbilityService]
})
export class AbilityModule {}
