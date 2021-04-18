import { Test, TestingModule } from '@nestjs/testing';
import { PokemonMoveDetailService } from '../service/pokemon-move-detail.service';
import { PokemonMoveDetailController } from './pokemon-move-detail.controller';

describe('PokemonMoveDetailController', () => {
  let controller: PokemonMoveDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokemonMoveDetailController],
      providers: [PokemonMoveDetailService]
    }).compile();

    controller = module.get<PokemonMoveDetailController>(
      PokemonMoveDetailController
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
