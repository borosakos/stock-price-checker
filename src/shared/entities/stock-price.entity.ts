import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

class ColumnNumericTransformer {
  to(data: number): number {
    return data;
  }
  from(data: string): number {
    return parseFloat(data);
  }
}

@Entity()
export class StockPrice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  symbol: string;

  @Column()
  source: string;

  @Column('numeric', {
    precision: 10,
    scale: 4,
    transformer: new ColumnNumericTransformer(),
  })
  price: number;

  @CreateDateColumn()
  timestamp: Date;
}
