import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Observed {
  @PrimaryColumn()
  id: number;

  @Column()
  symbol: string;
}
