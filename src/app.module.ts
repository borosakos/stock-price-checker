import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StockApiFetcherModule } from './stock-api-fetcher/stock-api-fetcher.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from './config/db.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    StockApiFetcherModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig],
    }),
    TypeOrmModule.forRootAsync({ useFactory: dbConfig }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
