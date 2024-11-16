import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Observed } from 'src/entities/observed.entity';
import { Repository } from 'typeorm';

interface FinnhubQuoteResponseV1 {
  c: number; // current price
  t: number; // current timestamp
}

interface StockPrice {
  price: number;
  timestamp: Date;
}

@Injectable()
export class StockFetcherService {
  private readonly logger = new Logger(StockFetcherService.name);
  private readonly observedId = 1;

  constructor(
    @InjectRepository(Observed)
    private readonly observedRepository: Repository<Observed>,
    private readonly httpService: HttpService,
  ) {}

  async save(symbol: string): Promise<void> {
    await this.observedRepository.save({
      id: this.observedId,
      symbol,
    });
  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  async runPeriodically() {
    const observedSymbol = await this.observedRepository.findOne({
      where: { id: this.observedId },
    });

    if (!observedSymbol) {
      this.logger.warn('No symbol defined');
      return;
    }

    const stockPrice = await this.fetchStockPrice(observedSymbol.symbol);
    if (!stockPrice) {
      return;
    }

    this.logger.log(`Fetched stock price:`, stockPrice);
  }

  async fetchStockPrice(symbol: string): Promise<StockPrice> {
    try {
      const { data } =
        await this.httpService.axiosRef.get<FinnhubQuoteResponseV1>(
          `https://finnhub.io/api/v1/quote?symbol=${symbol}`,
          {
            headers: {
              'X-Finnhub-Token': process.env.STOCK_API_KEY,
            },
          },
        );
      return {
        price: data.c,
        timestamp: new Date(data.t * 1000),
      };
    } catch (err) {
      if (err.response) {
        this.logger.error('Error from API call', {
          data: err.response.data,
          status: err.response.status,
        });
      } else {
        this.logger.error('Error in request', err.message);
      }
    }
  }
}
