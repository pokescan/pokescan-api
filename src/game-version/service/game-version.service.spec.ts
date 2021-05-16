import { Test, TestingModule } from '@nestjs/testing';
import { GameVersionService } from './game-version.service';

describe('GameVersionService', () => {
  let service: GameVersionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameVersionService]
    }).compile();

    service = module.get<GameVersionService>(GameVersionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
