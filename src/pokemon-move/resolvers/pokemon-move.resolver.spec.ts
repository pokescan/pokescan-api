import { Test, TestingModule } from '@nestjs/testing';
import { PokemonMoveResolver } from './pokemon-move.resolver';

describe('PokemonMoveResolver', () => {
  let resolver: PokemonMoveResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PokemonMoveResolver]
    }).compile();

    resolver = module.get<PokemonMoveResolver>(PokemonMoveResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
