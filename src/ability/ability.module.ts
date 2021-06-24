import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from '@shared/shared.module';
import { AbilityResolver } from './resolvers/ability.resolver';
import { Ability, AbilitySchema } from './schema/ability.schema';
import { AbilityService } from './service/ability.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Ability.name, schema: AbilitySchema }]),
    SharedModule
  ],
  providers: [AbilityResolver, AbilityService]
})
export class AbilityModule {}
