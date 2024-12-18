import * as path from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export default (): PostgresConnectionOptions => ({
  type: 'postgres',
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  password: process.env.DB_PASSWORD,
  username: process.env.DB_USERNAME,
  entities: [path.resolve(__dirname, '..') + '/**/*.entity{.ts,.js}'],

  dropSchema: true,
  synchronize: true,
});
