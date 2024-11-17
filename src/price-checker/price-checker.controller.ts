import { Controller, Get, Param } from '@nestjs/common';
import { PriceCheckerService } from './price-checker.service';
import MovingAverageResponseDto from './dto/MovingAverageResponseDto';
import { UppercasePipe } from 'src/shared/pipes/uppercasePipe';

@Controller('stock')
export class PriceCheckerController {
  constructor(private readonly priceCheckerService: PriceCheckerService) {}

  @Get(':symbol')
  async readMovingAvarageWithStats(
    @Param('symbol', UppercasePipe) symbol: string,
  ): Promise<MovingAverageResponseDto> {
    return this.priceCheckerService.readMovingAverageWithStats(symbol);
  }
}
