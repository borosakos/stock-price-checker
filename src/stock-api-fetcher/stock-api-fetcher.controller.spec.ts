import { Test, TestingModule } from '@nestjs/testing';
import { StockApiFetcherController } from './stock-api-fetcher.controller';

describe('StockApiFetcherController', () => {
  let controller: StockApiFetcherController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockApiFetcherController],
    }).compile();

    controller = module.get<StockApiFetcherController>(
      StockApiFetcherController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
