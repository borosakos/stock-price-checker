import { Module } from '@nestjs/common';
import { StockApiFetcherService } from './stock-api-fetcher.service';
import { StockApiFetcherController } from './stock-api-fetcher.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Observed } from '../entities/observed.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Observed])],
  providers: [StockApiFetcherService],
  controllers: [StockApiFetcherController],
})
export class StockApiFetcherModule {}
