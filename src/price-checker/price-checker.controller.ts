import { Controller, Get, Param } from '@nestjs/common';
import { PriceCheckerService } from './price-checker.service';
import MovingAverageResponseDto from './dto/moving-average-response-dto';
import { UppercasePipe } from '../shared/pipes/uppercase-pipe';
import { ApiResponse } from '@nestjs/swagger';

@Controller('stock')
export class PriceCheckerController {
  constructor(private readonly priceCheckerService: PriceCheckerService) {}

  @Get(':symbol')
  @ApiResponse({
    status: 200,
    description: 'The available infromation is returned about the symbol',
    type: MovingAverageResponseDto,
  })
  async readMovingAvarageWithStats(
    @Param('symbol', UppercasePipe) symbol: string,
  ): Promise<MovingAverageResponseDto> {
    return this.priceCheckerService.readMovingAverageWithStats(symbol);
  }
}
