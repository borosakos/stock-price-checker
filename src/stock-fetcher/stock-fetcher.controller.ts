import { Controller, Param, Put } from '@nestjs/common';
import { StockFetcherService } from './stock-fetcher.service';

@Controller('stock')
export class StockFetcherController {
  constructor(private readonly stockFetcherService: StockFetcherService) {}

  @Put(':symbol')
  async save(@Param('symbol') symbol: string): Promise<void> {
    return this.stockFetcherService.save(symbol);
  }
}
