import { Test, TestingModule } from '@nestjs/testing';
import { PokemonEncounterService } from './pokemon-encounter.service';

describe('PokemonEncounterService', () => {
  let service: PokemonEncounterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PokemonEncounterService]
    }).compile();

    service = module.get<PokemonEncounterService>(PokemonEncounterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
