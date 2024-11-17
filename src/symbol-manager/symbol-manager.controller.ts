import {
  BadRequestException,
  Controller,
  Inject,
  Param,
  Put,
} from '@nestjs/common';
import { SymbolManagerService } from './symbol-manager.service';
import StockApi from 'src/stock-api/stock-api.interface';

@Controller('stock')
export class SymbolManagerController {
  constructor(
    private readonly symbolManagerService: SymbolManagerService,
    @Inject('FinnhubStockApiService')
    private readonly apiFetcherService: StockApi,
  ) {}

  @Put(':symbol')
  async save(@Param('symbol') symbol: string): Promise<void> {
    const isValid = await this.apiFetcherService.isSymbolValid(symbol);

    if (!isValid) {
      throw new BadRequestException('The provided symbol is not valid!');
    }

    return this.symbolManagerService.save(symbol);
  }
}
