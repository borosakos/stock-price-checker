import { Controller, Param, Put } from '@nestjs/common';
import { StockApiFetcherService } from './stock-api-fetcher.service';

@Controller('stock')
export class StockApiFetcherController {
  constructor(
    private readonly stockApiFetcherService: StockApiFetcherService,
  ) {}

  @Put(':symbol')
  save(@Param('symbol') symbol: string) {
    this.stockApiFetcherService.save(symbol);
  }
}
