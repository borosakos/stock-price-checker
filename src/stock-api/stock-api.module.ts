import { Module } from '@nestjs/common';
import { FinnhubStockApiService } from './finnhub-stock-api.service';
import { HttpModule } from '@nestjs/axios';
import StockApi from './stock-api.service';
import StockPriceDto from './dto/stock-price-dto';

@Module({
  imports: [HttpModule],
  providers: [
    FinnhubStockApiService,
    StockPriceDto,
    {
      provide: StockApi,
      useFactory: (finnhubStockApiService: FinnhubStockApiService) => {
        return finnhubStockApiService;
      },
      inject: [FinnhubStockApiService],
    },
  ],
  exports: [StockApi, StockPriceDto],
})
export class StockApiModule {}
