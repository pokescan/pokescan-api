import { Test, TestingModule } from '@nestjs/testing';
import { Document } from 'mongoose';
import { AbstractService } from './abstract.service';

class TestModel {
  name: string;
}
type TestModelDocument = TestModel & Document;

describe('AbstractService', () => {
  let service: AbstractService<TestModelDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AbstractService]
    }).compile();

    service = module.get<AbstractService<TestModelDocument>>(AbstractService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
