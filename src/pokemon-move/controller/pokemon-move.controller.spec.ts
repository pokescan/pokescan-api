import { Test, TestingModule } from '@nestjs/testing';
import { PokemonMoveService } from '../service/pokemon-move.service';
import { PokemonMoveController } from './pokemon-move.controller';

describe('PokemonMoveController', () => {
  let controller: PokemonMoveController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokemonMoveController],
      providers: [PokemonMoveService]
    }).compile();

    controller = module.get<PokemonMoveController>(PokemonMoveController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
