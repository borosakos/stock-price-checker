import { Module } from '@nestjs/common';
import { UppercasePipe } from './pipes/uppercase-pipe';
import { StockPrice } from './entities/stock-price.entity';

@Module({
  providers: [UppercasePipe, StockPrice],
  exports: [UppercasePipe, StockPrice],
})
export class SharedModule {}
