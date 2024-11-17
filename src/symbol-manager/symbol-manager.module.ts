import { Module } from '@nestjs/common';
import { SymbolManagerController } from './symbol-manager.controller';
import { SymbolManagerService } from './symbol-manager.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Observed } from 'src/entities/observed.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Observed])],
  controllers: [SymbolManagerController],
  providers: [SymbolManagerService],
  exports: [SymbolManagerService],
})
export class SymbolManagerModule {}
