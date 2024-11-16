import { Module } from '@nestjs/common';
import { StockFetcherService } from './stock-fetcher.service';
import { StockFetcherController } from './stock-fetcher.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Observed } from '../entities/observed.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([Observed]), HttpModule],
  providers: [StockFetcherService],
  controllers: [StockFetcherController],
})
export class StockFetcherModule {}
