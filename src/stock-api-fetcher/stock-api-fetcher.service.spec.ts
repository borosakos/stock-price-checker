import { Test, TestingModule } from '@nestjs/testing';
import { StockApiFetcherService } from './stock-api-fetcher.service';

describe('StockApiFetcherService', () => {
  let service: StockApiFetcherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StockApiFetcherService],
    }).compile();

    service = module.get<StockApiFetcherService>(StockApiFetcherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
