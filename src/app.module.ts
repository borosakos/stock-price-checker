import { Module } from '@nestjs/common';
import { StockFetcherModule } from './stock-fetcher/stock-fetcher.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from './config/db.config';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { StockApiModule } from './stock-api/stock-api.module';
import { PriceCheckerModule } from './price-checker/price-checker.module';
import { SymbolManagerModule } from './symbol-manager/symbol-manager.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    StockFetcherModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig],
    }),
    TypeOrmModule.forRootAsync({ useFactory: dbConfig }),
    ScheduleModule.forRoot(),
    StockApiModule,
    PriceCheckerModule,
    SymbolManagerModule,
    SharedModule,
  ],
})
export class AppModule {}
