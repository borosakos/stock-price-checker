import { Controller, Param, Put } from '@nestjs/common';
import { SymbolManagerService } from './symbol-manager.service';
import SymbolValidationPipe from './pipes/symbolValidationPipe';

@Controller('stock')
export class SymbolManagerController {
  constructor(private readonly symbolManagerService: SymbolManagerService) {}

  @Put(':symbol')
  async save(
    @Param('symbol', SymbolValidationPipe) symbol: string,
  ): Promise<void> {
    return this.symbolManagerService.save(symbol);
  }
}
