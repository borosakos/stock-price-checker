import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StockPrice } from 'src/entities/stock-price.entity';
import { Repository } from 'typeorm';
import MovingAverageResponseDto from './dto/MovingAverageResponseDto';

@Injectable()
export class PriceCheckerService {
  constructor(
    @InjectRepository(StockPrice)
    private readonly stockPriceRepository: Repository<StockPrice>,
  ) {}

  async readMovingAverageWithStats(
    symbol: string,
    windowSize: number = 10,
  ): Promise<MovingAverageResponseDto> {
    const stockPrices = await this.stockPriceRepository.find({
      select: ['price', 'timestamp'],
      where: { symbol },
      order: { timestamp: 'DESC' },
      take: windowSize,
    });

    const [currStockPrice] = stockPrices;

    if (!currStockPrice) {
      return {
        message: 'There is no available price for this symbol!',
      };
    }

    const partialResult = {
      result: {
        price: currStockPrice.price,
        timestamp: currStockPrice.timestamp,
        windowSize,
      },
    };

    if (stockPrices.length < windowSize) {
      return {
        ...partialResult,
        message:
          'The number of historical records is not sufficient for moving average calculation yet!',
      };
    }

    const sumOfPrices = stockPrices
      .map((sp) => sp.price)
      .reduce((a, b) => a + b, 0);

    return {
      result: {
        ...partialResult.result,
        movingAvarage: sumOfPrices / windowSize,
      },
    };
  }
}
