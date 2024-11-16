import { Module } from '@nestjs/common';
import { StockFetcherService } from './stock-fetcher.service';
import { StockFetcherController } from './stock-fetcher.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Observed } from '../entities/observed.entity';
import { HttpModule } from '@nestjs/axios';
import { StockApiModule } from 'src/stock-api/stock-api.module';

@Module({
  imports: [TypeOrmModule.forFeature([Observed]), HttpModule, StockApiModule],
  providers: [StockFetcherService],
  controllers: [StockFetcherController],
})
export class StockFetcherModule {}
