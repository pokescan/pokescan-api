import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LanguageMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void): void {
    console.log(
      '🚀 ~ file: language.middleware.ts ~ line 7 ~ LanguageMiddleware ~ use ~ req',
      req.headers
    );
    next();
  }
}
