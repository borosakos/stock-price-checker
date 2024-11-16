export interface StockPrice {
  price: number;
  timestamp: Date;
}

export interface StockApi {
  fetchStockPrice(symbol: string): Promise<StockPrice>;
}
