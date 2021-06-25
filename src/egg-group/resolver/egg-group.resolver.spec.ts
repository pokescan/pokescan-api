import { Test, TestingModule } from '@nestjs/testing';
import { EggGroupResolver } from './egg-group.resolver';
import { EggGroupService } from './egg-group.service';

describe('EggGroupResolver', () => {
  let resolver: EggGroupResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EggGroupResolver, EggGroupService]
    }).compile();

    resolver = module.get<EggGroupResolver>(EggGroupResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
