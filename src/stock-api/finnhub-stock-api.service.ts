import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import StockApi from './stock-api.service';
import FinnhubQuoteResponseV1 from './dto/finnhub-quote-response-v1-dto';
import StockPriceDto from './dto/stock-price-dto';
import StockSymbolResponseV1Dto from './dto/finnhub-stock-symbol-response-v1-dto';

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
        source: this.getSource(),
        symbol: symbol,
        timestamp: new Date(data.t * 1000),
      };
    } catch (err) {
      if (err.response) {
        this.logger.error('Error from API call', {
          data: err.response.data,
          status: err.response.status,
        });
        return;
      }
      this.logger.error('Error in request', err.message);
    }
  }

  async isSymbolValid(symbol: string): Promise<boolean> {
    const { result } = await this.fetchSymbolLookup(symbol);

    const matchingSymbols = result
      .map((res) => res.symbol.toUpperCase())
      .filter((res) => symbol.toUpperCase() === res).length;

    this.logger.debug(
      `The queried symbol ${matchingSymbols > 0 ? 'exists' : 'not exists'} `,
    );

    return matchingSymbols > 0;
  }

  private async fetchSymbolLookup(
    symbol: string,
  ): Promise<StockSymbolResponseV1Dto> {
    try {
      const { data } =
        await this.httpService.axiosRef.get<StockSymbolResponseV1Dto>(
          `https://finnhub.io/api/v1/search?q=${symbol}`,
          {
            headers: {
              'X-Finnhub-Token': process.env.STOCK_API_KEY,
            },
          },
        );
      return data;
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
    return { count: 0, result: [] };
  }

  getSource(): string {
    return FinnhubStockApiService.source;
  }
}
