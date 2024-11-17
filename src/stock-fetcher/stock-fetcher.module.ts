import { Module } from '@nestjs/common';
import { StockFetcherService } from './stock-fetcher.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { StockApiModule } from '../stock-api/stock-api.module';
import { StockPrice } from '../shared/entities/stock-price.entity';
import { SymbolManagerModule } from '../symbol-manager/symbol-manager.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([StockPrice]),
    HttpModule,
    StockApiModule,
    SymbolManagerModule,
  ],
  providers: [StockFetcherService],
})
export class StockFetcherModule {}
