import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import SymbolDto from './dto/SymbolDto';
import { Observed } from './entities/observed.entity';

@Injectable()
export class SymbolManagerService {
  private readonly observedId = 1;

  constructor(
    @InjectRepository(Observed)
    private readonly observedRepository: Repository<Observed>,
  ) {}

  async save(symbol: string): Promise<SymbolDto> {
    const result = await this.observedRepository.save({
      id: this.observedId,
      symbol,
    });
    return { symbol: result.symbol };
  }

  async get(): Promise<SymbolDto> {
    const result = await this.observedRepository.findOne({
      where: { id: this.observedId },
    });

    return { symbol: result?.symbol };
  }
}
