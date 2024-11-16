import { Test, TestingModule } from '@nestjs/testing';
import { StockFetcherService } from './stock-fetcher.service';

describe('StockFetcherService', () => {
  let service: StockFetcherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StockFetcherService],
    }).compile();

    service = module.get<StockFetcherService>(StockFetcherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
