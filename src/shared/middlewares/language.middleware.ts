import { Injectable, NestMiddleware } from '@nestjs/common';
import { LANGUAGE_HEADER_KEY } from '@shared/constants';
import { LanguageService } from '@shared/services/language/language.service';
import { Request, Response } from 'express';

@Injectable()
export class LanguageMiddleware implements NestMiddleware {
  constructor(private readonly languageService: LanguageService) {}

  use(req: Request, res: Response, next: () => void): void {
    const languageInHeader: string = req.headers[LANGUAGE_HEADER_KEY] as string;

    this.languageService.currentLanguage = languageInHeader;

    next();
  }
}
