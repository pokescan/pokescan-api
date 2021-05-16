import { GameVersionService } from '@game-version/service/game-version.service';
import { Test, TestingModule } from '@nestjs/testing';
import { GameVersionResolver } from './game-version.resolver';

describe('GameVersionResolver', () => {
  let resolver: GameVersionResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameVersionResolver, GameVersionService]
    }).compile();

    resolver = module.get<GameVersionResolver>(GameVersionResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
