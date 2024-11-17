import {
  ArgumentMetadata,
  BadRequestException,
  Inject,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import StockApi from '../../stock-api/stock-api.service';

@Injectable()
export default class SymbolValidationPipe
  implements PipeTransform<string, Promise<string>>
{
  constructor(
    @Inject(StockApi)
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
