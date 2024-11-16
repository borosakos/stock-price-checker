import { Module } from '@nestjs/common';
import { StockApiFetcherService } from './stock-api-fetcher.service';
import { StockApiFetcherController } from './stock-api-fetcher.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Observed } from '../entities/observed.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([Observed]), HttpModule],
  providers: [StockApiFetcherService],
  controllers: [StockApiFetcherController],
})
export class StockApiFetcherModule {}
