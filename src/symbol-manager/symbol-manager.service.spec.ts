import { Test, TestingModule } from '@nestjs/testing';
import { SymbolManagerService } from './symbol-manager.service';

describe('SymbolManagerService', () => {
  let service: SymbolManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SymbolManagerService],
    }).compile();

    service = module.get<SymbolManagerService>(SymbolManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
