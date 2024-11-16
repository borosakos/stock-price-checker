import { Module } from '@nestjs/common';
import { StockApiService } from './stock-api.service';

@Module({
  providers: [StockApiService],
})
export class StockApiModule {}
