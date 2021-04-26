import { Test, TestingModule } from '@nestjs/testing';
import { PokemonTypeService } from './pokemon-type.service';

describe('PokemonTypeService', () => {
  let service: PokemonTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PokemonTypeService],
    }).compile();

    service = module.get<PokemonTypeService>(PokemonTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
