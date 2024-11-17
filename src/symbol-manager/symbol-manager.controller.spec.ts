import { Test, TestingModule } from '@nestjs/testing';
import { SymbolManagerController } from './symbol-manager.controller';

describe('SymbolManagerController', () => {
  let controller: SymbolManagerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SymbolManagerController],
    }).compile();

    controller = module.get<SymbolManagerController>(SymbolManagerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
