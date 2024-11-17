import { Module } from '@nestjs/common';
import { FinnhubStockApiService } from './finnhub-stock-api.service';
import { HttpModule } from '@nestjs/axios';
import StockApi from './stock-api.service';

@Module({
  imports: [HttpModule],
  providers: [
    FinnhubStockApiService,
    {
      provide: StockApi,
      useFactory: (finnhubStockApiService: FinnhubStockApiService) => {
        return finnhubStockApiService;
      },
      inject: [FinnhubStockApiService],
    },
  ],
  exports: [StockApi],
})
export class StockApiModule {}
