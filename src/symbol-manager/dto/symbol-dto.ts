import { ApiProperty } from '@nestjs/swagger';

export default class SymbolDto {
  @ApiProperty()
  symbol: string;
}
