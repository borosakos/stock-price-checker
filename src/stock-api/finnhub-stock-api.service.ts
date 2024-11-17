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
    const { c, t } = await this.queryApi<FinnhubQuoteResponseV1>(
      `https://finnhub.io/api/v1/quote?symbol=${symbol}`,
    );

    return {
      price: c,
      source: this.getSource(),
      symbol: symbol,
      timestamp: new Date(t * 1000),
    };
  }

  async isSymbolValid(symbol: string): Promise<boolean> {
    const { result } = await this.queryApi<StockSymbolResponseV1Dto>(
      `https://finnhub.io/api/v1/search?q=${symbol}`,
    );

    const matchingSymbols = result
      .map((res) => res.symbol.toLowerCase())
      .filter((res) => symbol.toLowerCase() === res).length;

    this.logger.debug(
      `The queried symbol ${matchingSymbols > 0 ? 'exists' : 'not exists'} `,
    );

    return matchingSymbols > 0;
  }

  private async queryApi<T>(url: string): Promise<T> {
    try {
      const { data } = await this.httpService.axiosRef.get<T>(url, {
        headers: {
          'X-Finnhub-Token': process.env.STOCK_API_KEY,
        },
      });
      return data;
    } catch (err) {
      if (err.response) {
        this.logger.error('Unknown error from API call', {
          data: err.response.data,
          status: err.response.status,
        });
      } else {
        this.logger.error('Error in request', err.message);
      }
    }
  }

  getSource(): string {
    return FinnhubStockApiService.source;
  }
}
