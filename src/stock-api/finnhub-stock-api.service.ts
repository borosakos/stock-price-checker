import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { StockApi, StockPrice } from './stock-api.service';

interface FinnhubQuoteResponseV1 {
  c: number; // current price
  t: number; // current timestamp
}

@Injectable()
export class FinnhubStockApiService implements StockApi {
  private readonly logger: Logger = new Logger(FinnhubStockApiService.name);

  constructor(private readonly httpService: HttpService) {}

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
