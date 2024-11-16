import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class StockPrice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('numeric', {
    precision: 10,
    scale: 4,
  })
  price: number;

  @CreateDateColumn()
  timestamp: Date;
}