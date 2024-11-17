import { Module } from '@nestjs/common';
import { PriceCheckerController } from './price-checker.controller';
import { PriceCheckerService } from './price-checker.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockPrice } from '../shared/entities/stock-price.entity';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [TypeOrmModule.forFeature([StockPrice]), SharedModule],
  controllers: [PriceCheckerController],
  providers: [PriceCheckerService],
})
export class PriceCheckerModule {}
