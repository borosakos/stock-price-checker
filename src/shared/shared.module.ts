import { Module } from '@nestjs/common';
import { UppercasePipe } from './pipes/uppercase-pipe';

@Module({
  providers: [UppercasePipe],
})
export class SharedModule {}
