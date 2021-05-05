import { Test, TestingModule } from '@nestjs/testing';
import { PokemonTypeResolver } from './pokemon-type.resolver';

describe('PokemonTypeResolver', () => {
  let resolver: PokemonTypeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PokemonTypeResolver]
    }).compile();

    resolver = module.get<PokemonTypeResolver>(PokemonTypeResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
