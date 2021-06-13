import { Test, TestingModule } from '@nestjs/testing';
import { EggGroupService } from './egg-group.service';

describe('EggGroupService', () => {
  let service: EggGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EggGroupService]
    }).compile();

    service = module.get<EggGroupService>(EggGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
