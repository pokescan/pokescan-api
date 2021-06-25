import { Module } from '@nestjs/common';
import { AbstractService } from './services/abstract/abstract.service';
import { LanguageService } from './services/language/language.service';

@Module({
  providers: [AbstractService, LanguageService],
  exports: [AbstractService, LanguageService]
})
export class SharedModule {}
