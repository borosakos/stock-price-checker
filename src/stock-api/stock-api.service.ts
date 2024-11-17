import StockPriceDto from './dto/stockPriceDto';

export default abstract class StockApi {
  abstract fetchStockPrice(symbol: string): Promise<StockPriceDto>;
  abstract isSymbolValid(symbol: string): Promise<boolean>;
  abstract getSource(): string;
}
