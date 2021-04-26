import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from '@shared/shared.module';
import { AbilityModule } from './ability/ability.module';
import { RegionModule } from './region/region.module';
import { LocationModule } from './location/location.module';
import { GenerationModule } from './generation/generation.module';

@Module({
  imports: [
    SharedModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }),
    AbilityModule,
    RegionModule,
    LocationModule,
    GenerationModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
