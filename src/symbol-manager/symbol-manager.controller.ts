import { Controller, Param, Put } from '@nestjs/common';
import { SymbolManagerService } from './symbol-manager.service';
import SymbolValidationPipe from './pipes/symbol-validation-pipe';
import { UppercasePipe } from 'src/shared/pipes/uppercase-pipe';
import SymbolDto from './dto/symbol-dto';

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
