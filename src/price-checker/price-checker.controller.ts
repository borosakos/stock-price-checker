import { Controller, Get, Param } from '@nestjs/common';
import { PriceCheckerService } from './price-checker.service';
import MovingAverageResponseDto from './dto/MovingAverageResponseDto';

@Controller('stock')
export class PriceCheckerController {
  constructor(private readonly priceCheckerService: PriceCheckerService) {}

  @Get(':symbol')
  async readMovingAvarageWithStats(
    @Param('symbol') symbol: string,
  ): Promise<MovingAverageResponseDto> {
    return this.priceCheckerService.readMovingAverageWithStats(symbol);
  }
}
