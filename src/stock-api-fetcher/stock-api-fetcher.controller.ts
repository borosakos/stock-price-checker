import { Controller, Param, Put } from '@nestjs/common';
import { StockApiFetcherService } from './stock-api-fetcher.service';

@Controller('stock')
export class StockApiFetcherController {
  constructor(
    private readonly stockApiFetcherService: StockApiFetcherService,
  ) {}

  @Put(':symbol')
  async save(@Param('symbol') symbol: string): Promise<void> {
    return this.stockApiFetcherService.save(symbol);
  }
}
