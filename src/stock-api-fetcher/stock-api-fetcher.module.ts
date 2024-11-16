import { Module } from '@nestjs/common';
import { StockApiFetcherService } from './stock-api-fetcher.service';
import { StockApiFetcherController } from './stock-api-fetcher.controller';

@Module({
  providers: [StockApiFetcherService],
  controllers: [StockApiFetcherController],
})
export class StockApiFetcherModule {}
