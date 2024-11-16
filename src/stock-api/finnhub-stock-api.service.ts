import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import StockApi from './stock-api.service';
import FinnhubQuoteResponseV1 from './dto/FinnhubQuoteResponseV1Dto';
import StockPriceDto from './dto/stockPriceDto';

@Injectable()
export class FinnhubStockApiService implements StockApi {
  public static readonly source = 'FINNHUB';

  private readonly logger: Logger = new Logger(FinnhubStockApiService.name);

  constructor(private readonly httpService: HttpService) {}

  async fetchStockPrice(symbol: string): Promise<StockPriceDto> {
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
        source: FinnhubStockApiService.source,
        symbol: symbol,
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
