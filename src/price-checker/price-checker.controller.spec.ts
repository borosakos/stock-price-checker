import { Test, TestingModule } from '@nestjs/testing';
import { PriceCheckerController } from './price-checker.controller';

describe('PriceCheckerController', () => {
  let controller: PriceCheckerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PriceCheckerController],
    }).compile();

    controller = module.get<PriceCheckerController>(PriceCheckerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
