import { Controller, Param, Put } from '@nestjs/common';
import { SymbolManagerService } from './symbol-manager.service';

@Controller('stock')
export class SymbolManagerController {
  constructor(private readonly symbolManagerService: SymbolManagerService) {}

  @Put(':symbol')
  async save(@Param('symbol') symbol: string): Promise<void> {
    return this.symbolManagerService.save(symbol);
  }
}
