import { Test, TestingModule } from '@nestjs/testing';
import { PokemonStatController } from './pokemon-stat.controller';
import { PokemonStatService } from './pokemon-stat.service';

describe('PokemonStatController', () => {
  let controller: PokemonStatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokemonStatController],
      providers: [PokemonStatService],
    }).compile();

    controller = module.get<PokemonStatController>(PokemonStatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
