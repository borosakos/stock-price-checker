import {
  ArgumentMetadata,
  BadRequestException,
  Inject,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import StockApi from 'src/stock-api/stock-api.interface';

@Injectable()
export default class SymbolValidationPipe
  implements PipeTransform<string, Promise<string>>
{
  constructor(
    @Inject('FinnhubStockApiService')
    private readonly apiFetcherService: StockApi,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async transform(value: string, metadata: ArgumentMetadata): Promise<string> {
    const isValid = await this.apiFetcherService.isSymbolValid(value);

    if (!isValid) {
      throw new BadRequestException('The provided symbol is not valid!');
    }
    return value;
  }
}
