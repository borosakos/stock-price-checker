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

    if (stockPrices.length < windowSize) {
      console.log(
        `The number of historical records is not sufficient for calculation yet!`,
      );
      return; // TODO: Add exception
    }

    const sumOfPrices = stockPrices
      .map((sp) => sp.price)
      .reduce((a, b) => a + b, 0);

    const [currStockPrice] = stockPrices;

    return {
      price: currStockPrice.price,
      timestamp: currStockPrice.timestamp,
      movingAvarage: sumOfPrices / windowSize,
      windowSize,
    };
  }
}
