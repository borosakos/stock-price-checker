import { Controller, Param, Put } from '@nestjs/common';
import { SymbolManagerService } from './symbol-manager.service';
import SymbolValidationPipe from './pipes/symbolValidationPipe';
import { UppercasePipe } from 'src/shared/pipes/uppercasePipe';
import SymbolDto from './dto/SymbolDto';

@Controller('stock')
export class SymbolManagerController {
  constructor(private readonly symbolManagerService: SymbolManagerService) {}

  @Put(':symbol')
  async save(
    @Param('symbol', UppercasePipe, SymbolValidationPipe) symbol: string,
  ): Promise<SymbolDto> {
    return this.symbolManagerService.save(symbol);
  }
}
