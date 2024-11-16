import { Module } from '@nestjs/common';
import { FinnhubStockApiService } from './finnhub-stock-api.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: 'FinnhubStockApiService',
      useClass: FinnhubStockApiService,
    },
  ],
  exports: ['FinnhubStockApiService'],
})
export class StockApiModule {}
