import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Observed } from 'src/entities/observed.entity';
import { StockPrice } from 'src/entities/stock-price.entity';
import StockApi from 'src/stock-api/stock-api.service';
import { Repository } from 'typeorm';

@Injectable()
export class StockFetcherService {
  private readonly logger = new Logger(StockFetcherService.name);
  private readonly observedId = 1;

  constructor(
    @InjectRepository(Observed)
    private readonly observedRepository: Repository<Observed>,
    @InjectRepository(StockPrice)
    private readonly stockPriceRepository: Repository<StockPrice>,
    @Inject('FinnhubStockApiService')
    private readonly apiFetcherService: StockApi,
  ) {}

  async save(symbol: string): Promise<void> {
    await this.observedRepository.save({
      id: this.observedId,
      symbol,
    });
  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  async runPeriodically() {
    const observedSymbol = await this.observedRepository.findOne({
      where: { id: this.observedId },
    });

    if (!observedSymbol) {
      this.logger.warn('No symbol defined');
      return;
    }

    const stockPriceDto = await this.apiFetcherService.fetchStockPrice(
      observedSymbol.symbol,
    );
    if (!stockPriceDto) {
      return;
    }

    this.logger.debug(`Fetched stock price:`, stockPriceDto);
    await this.stockPriceRepository.save(stockPriceDto);
  }
}
