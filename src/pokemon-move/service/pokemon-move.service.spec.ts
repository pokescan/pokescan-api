import { Test, TestingModule } from '@nestjs/testing';
import { PokemonMoveService } from './pokemon-move.service';

describe('PokemonMoveService', () => {
  let service: PokemonMoveService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PokemonMoveService],
    }).compile();

    service = module.get<PokemonMoveService>(PokemonMoveService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
