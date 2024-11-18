import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { StockPrice } from '../shared/entities/stock-price.entity';
import StockApi from '../stock-api/stock-api.service';
import { SymbolManagerService } from '../symbol-manager/symbol-manager.service';
import { Repository } from 'typeorm';

@Injectable()
export class StockFetcherService {
  private readonly logger = new Logger(StockFetcherService.name);

  constructor(
    @InjectRepository(StockPrice)
    private readonly stockPriceRepository: Repository<StockPrice>,
    @Inject(StockApi)
    private readonly stockApiService: StockApi,
    @Inject(SymbolManagerService)
    private readonly symbolManagerService: SymbolManagerService,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async runPeriodically() {
    const { symbol } = await this.symbolManagerService.get();

    if (!symbol) {
      return;
    }

    const symbolExists = await this.stockPriceRepository.findOne({
      where: { symbol },
    });

    if (!symbolExists) {
      await this.stockPriceRepository.clear();
    }

    const [stockPriceDto, error] =
      await this.stockApiService.fetchStockPrice(symbol);

    if (error) {
      this.logger.error(
        'Cannot fetch stock price data, clearing all of the' +
          'previous information in order to keep sampling rate consistent!',
        error,
      );
      await this.stockPriceRepository.clear();
      return;
    }

    this.logger.debug(`Fetched stock price:`, stockPriceDto);
    await this.stockPriceRepository.save(stockPriceDto);
  }
}
