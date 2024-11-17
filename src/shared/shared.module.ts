import { Module } from '@nestjs/common';
import { UppercasePipe } from './pipes/uppercasePipe';

@Module({
  providers: [UppercasePipe],
})
export class SharedModule {}
