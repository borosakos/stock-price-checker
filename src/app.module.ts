import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StockApiFetcherModule } from './stock-api-fetcher/stock-api-fetcher.module';

@Module({
  imports: [StockApiFetcherModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
