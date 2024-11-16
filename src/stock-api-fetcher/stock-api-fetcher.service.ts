import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observed } from 'src/entities/observed.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StockApiFetcherService {
  private readonly observedId = 1;

  constructor(
    @InjectRepository(Observed)
    private readonly observedRepository: Repository<Observed>,
  ) {}

  async save(symbol: string): Promise<void> {
    await this.observedRepository.save({
      id: this.observedId,
      symbol,
    });
  }
}
