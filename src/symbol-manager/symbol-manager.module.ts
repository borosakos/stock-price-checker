import { Module } from '@nestjs/common';
import { SymbolManagerController } from './symbol-manager.controller';
import { SymbolManagerService } from './symbol-manager.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockApiModule } from '../stock-api/stock-api.module';
import { SharedModule } from '../shared/shared.module';
import { Observed } from './entities/observed.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Observed]), StockApiModule, SharedModule],
  controllers: [SymbolManagerController],
  providers: [SymbolManagerService],
  exports: [SymbolManagerService],
})
export class SymbolManagerModule {}
