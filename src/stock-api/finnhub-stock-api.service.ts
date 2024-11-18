import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import StockApi from './stock-api.service';
import FinnhubQuoteResponseV1 from './dto/finnhub-quote-response-v1-dto';
import StockPriceDto from './dto/stock-price-dto';
import StockSymbolResponseV1Dto from './dto/finnhub-stock-symbol-response-v1-dto';
import ApiError from './dto/api-error-dto';
import axios from 'axios';

@Injectable()
export class FinnhubStockApiService implements StockApi {
  public static readonly source = 'FINNHUB';

  private readonly logger: Logger = new Logger(FinnhubStockApiService.name);

  constructor(private readonly httpService: HttpService) {}

  async fetchStockPrice(symbol: string): Promise<[StockPriceDto, ApiError]> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [quote, error] = await this.queryApi<FinnhubQuoteResponseV1>(
      `https://finnhub.io/api/v1/quote?symbol=${symbol}`,
    );

    if (error) {
      return [null, error];
    }

    const stockPrice = {
      price: quote.c,
      source: this.getSource(),
      symbol: symbol,
      timestamp: new Date(quote.t * 1000),
    };

    return [stockPrice, null];
  }

  async isSymbolValid(symbol: string): Promise<[boolean, ApiError]> {
    const [data, error] = await this.queryApi<StockSymbolResponseV1Dto>(
      `https://finnhub.io/api/v1/search?q=${symbol}`,
    );

    if (error) {
      return [null, error];
    }

    const matchingSymbols = data.result
      .map((res) => res.symbol.toLowerCase())
      .filter((res) => symbol.toLowerCase() === res).length;

    this.logger.debug(
      `The queried symbol ${matchingSymbols > 0 ? 'exists' : 'not exists'} `,
    );

    return [matchingSymbols > 0, null];
  }

  private async queryApi<T>(url: string): Promise<[T, ApiError]> {
    try {
      const { data } = await this.httpService.axiosRef.get<T>(url, {
        headers: {
          'X-Finnhub-Token': process.env.STOCK_API_KEY,
        },
      });
      return [data, null];
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          const error: ApiError = {
            errorMsg: err.response.data,
            status: err.response.status,
          };
          this.logger.error('Error from API call', error);
          return [null, error];
        }
      }
      this.logger.error('Unknown error during API call');
      const error: ApiError = {
        errorMsg: 'Internal server error',
        status: 500,
      };
      return [null, error];
    }
  }

  getSource(): string {
    return FinnhubStockApiService.source;
  }
}
