import { Test, TestingModule } from '@nestjs/testing';
import { PokemonEncounterResolver } from './pokemon-encounter.resolver';
import { PokemonEncounterService } from './pokemon-encounter.service';

describe('PokemonEncounterResolver', () => {
  let resolver: PokemonEncounterResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PokemonEncounterResolver, PokemonEncounterService]
    }).compile();

    resolver = module.get<PokemonEncounterResolver>(PokemonEncounterResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
