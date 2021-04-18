import { Module } from '@nestjs/common';
import { AbstractService } from './services/abstract/abstract.service';

@Module({
  providers: [AbstractService],
  exports: [AbstractService]
})
export class SharedModule {}
