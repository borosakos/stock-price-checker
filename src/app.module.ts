import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StockFetcherModule } from './stock-fetcher/stock-fetcher.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from './config/db.config';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    StockFetcherModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig],
    }),
    TypeOrmModule.forRootAsync({ useFactory: dbConfig }),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
