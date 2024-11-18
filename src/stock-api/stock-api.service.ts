import ApiError from './dto/api-error-dto';
import StockPriceDto from './dto/stock-price-dto';

export default abstract class StockApi {
  abstract fetchStockPrice(symbol: string): Promise<[StockPriceDto, ApiError]>;
  abstract isSymbolValid(symbol: string): Promise<[boolean, ApiError]>;
  abstract getSource(): string;
}
