import { Injectable, Scope } from '@nestjs/common';
import { DEFAULT_LANGUAGE } from '@shared/constants';

@Injectable({
  scope: Scope.REQUEST
})
export class LanguageService {
  private _currentLanguage = DEFAULT_LANGUAGE;

  set currentLanguage(language: string) {
    this._currentLanguage = language;
  }

  get currentLanguage(): string {
    return this._currentLanguage;
  }
}
