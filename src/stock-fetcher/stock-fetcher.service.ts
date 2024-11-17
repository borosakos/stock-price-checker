import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { StockPrice } from 'src/shared/entities/stock-price.entity';
import StockApi from 'src/stock-api/stock-api.service';
import { SymbolManagerService } from 'src/symbol-manager/symbol-manager.service';
import { Repository } from 'typeorm';

@Injectable()
export class StockFetcherService {
  private readonly logger = new Logger(StockFetcherService.name);

  constructor(
    @InjectRepository(StockPrice)
    private readonly stockPriceRepository: Repository<StockPrice>,
    @Inject(StockApi)
    private readonly apiFetcherService: StockApi,
    @Inject(SymbolManagerService)
    private readonly symbolManagerService: SymbolManagerService,
  ) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  async runPeriodically() {
    const { symbol: observedSymbol } = await this.symbolManagerService.get();

    if (!observedSymbol) {
      return;
    }

    const stockPriceDto =
      await this.apiFetcherService.fetchStockPrice(observedSymbol);

    if (!stockPriceDto) {
      return;
    }

    this.logger.debug(`Fetched stock price:`, stockPriceDto);
    await this.stockPriceRepository.save(stockPriceDto);
  }
}
