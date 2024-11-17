import { Controller, Param, Put } from '@nestjs/common';
import { SymbolManagerService } from './symbol-manager.service';
import SymbolValidationPipe from './pipes/symbol-validation-pipe';
import { UppercasePipe } from '../shared/pipes/uppercase-pipe';
import SymbolDto from './dto/symbol-dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('stock')
export class SymbolManagerController {
  constructor(private readonly symbolManagerService: SymbolManagerService) {}

  @Put(':symbol')
  @ApiResponse({
    status: 200,
    description: 'The symbol has been successfully registered',
    type: SymbolDto,
  })
  @ApiResponse({
    status: 400,
    description: 'The provided symbol is not valid',
  })
  async save(
    @Param('symbol', UppercasePipe, SymbolValidationPipe) symbol: string,
  ): Promise<SymbolDto> {
    return this.symbolManagerService.save(symbol);
  }
}
