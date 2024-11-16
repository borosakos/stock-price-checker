import { Test, TestingModule } from '@nestjs/testing';
import { StockFetcherController } from './stock-fetcher.controller';

describe('StockFetcherController', () => {
  let controller: StockFetcherController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockFetcherController],
    }).compile();

    controller = module.get<StockFetcherController>(StockFetcherController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
