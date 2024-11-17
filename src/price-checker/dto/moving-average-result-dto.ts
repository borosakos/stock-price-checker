import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export default class MovingAverageResultDto {
  @ApiProperty()
  price: number;

  @ApiProperty()
  timestamp: Date;

  @ApiPropertyOptional()
  movingAvarage?: number;

  @ApiProperty()
  windowSize: number;
}
