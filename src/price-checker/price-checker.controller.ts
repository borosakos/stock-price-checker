import { Controller, Get, Param } from '@nestjs/common';
import { PriceCheckerService } from './price-checker.service';
import MovingAverageResponseDto from './dto/moving-average-response-dto';
import { UppercasePipe } from 'src/shared/pipes/uppercase-pipe';

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
