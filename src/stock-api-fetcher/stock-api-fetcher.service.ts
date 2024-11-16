import { Injectable } from '@nestjs/common';

@Injectable()
export class StockApiFetcherService {
  save(symbol: string) {
    console.log(`${symbol} received`);
  }
}
