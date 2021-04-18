import { Test, TestingModule } from '@nestjs/testing';
import { PokemonTypeService } from '../service/pokemon-type.service';
import { PokemonTypeController } from './pokemon-type.controller';

describe('PokemonTypeController', () => {
  let controller: PokemonTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokemonTypeController],
      providers: [PokemonTypeService]
    }).compile();

    controller = module.get<PokemonTypeController>(PokemonTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
