import { LanguageMiddleware } from './language.middleware';

describe('LanguageMiddleware', () => {
  it('should be defined', () => {
    expect(new LanguageMiddleware()).toBeDefined();
  });
});
