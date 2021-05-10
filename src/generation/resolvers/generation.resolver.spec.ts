import { GenerationService } from '@generation/service/generation.service';
import { Test, TestingModule } from '@nestjs/testing';
import { GenerationResolver } from './generation.resolver';

describe('GenerationResolver', () => {
  let resolver: GenerationResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GenerationResolver, GenerationService]
    }).compile();

    resolver = module.get<GenerationResolver>(GenerationResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
