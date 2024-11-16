import { Module } from '@nestjs/common';
import { PriceCheckerController } from './price-checker.controller';
import { PriceCheckerService } from './price-checker.service';

@Module({
  controllers: [PriceCheckerController],
  providers: [PriceCheckerService]
})
export class PriceCheckerModule {}
