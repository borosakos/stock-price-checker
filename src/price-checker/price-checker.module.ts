import { Module } from '@nestjs/common';
import { PriceCheckerController } from './price-checker.controller';
import { PriceCheckerService } from './price-checker.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockPrice } from 'src/entities/stock-price.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StockPrice])],
  controllers: [PriceCheckerController],
  providers: [PriceCheckerService],
})
export class PriceCheckerModule {}
