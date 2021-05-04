import { Test, TestingModule } from '@nestjs/testing';
import { PokemonStatService } from './pokemon-stat.service';

describe('PokemonStatService', () => {
  let service: PokemonStatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PokemonStatService],
    }).compile();

    service = module.get<PokemonStatService>(PokemonStatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
