import StockPriceDto from './dto/stockPriceDto';

export default interface StockApi {
  fetchStockPrice(symbol: string): Promise<StockPriceDto>;
}
