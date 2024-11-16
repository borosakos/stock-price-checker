import { Test, TestingModule } from '@nestjs/testing';
import { FinnhubStockApiService } from './finnhub-stock-api.service';

describe('FinnhubStockApiService', () => {
  let service: FinnhubStockApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FinnhubStockApiService],
    }).compile();

    service = module.get<FinnhubStockApiService>(FinnhubStockApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
