import { Module } from '@nestjs/common';
import { SymbolManagerController } from './symbol-manager.controller';
import { SymbolManagerService } from './symbol-manager.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Observed } from 'src/entities/observed.entity';
import { StockApiModule } from 'src/stock-api/stock-api.module';

@Module({
  imports: [TypeOrmModule.forFeature([Observed]), StockApiModule],
  controllers: [SymbolManagerController],
  providers: [SymbolManagerService],
  exports: [SymbolManagerService],
})
export class SymbolManagerModule {}
