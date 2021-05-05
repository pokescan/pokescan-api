import { Test, TestingModule } from '@nestjs/testing';
import { AbilityService } from '../service/ability.service';
import { AbilityResolver } from './ability.resolver';

describe('AbilityResolver', () => {
  let resolver: AbilityResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AbilityResolver, AbilityService]
    }).compile();

    resolver = module.get<AbilityResolver>(AbilityResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
