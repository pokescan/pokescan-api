import { Test, TestingModule } from '@nestjs/testing';
import { PokemonMoveDetailService } from './pokemon-move-detail.service';

describe('PokemonMoveDetailService', () => {
  let service: PokemonMoveDetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PokemonMoveDetailService],
    }).compile();

    service = module.get<PokemonMoveDetailService>(PokemonMoveDetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
