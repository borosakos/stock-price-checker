import { ApiPropertyOptional } from '@nestjs/swagger';
import MovingAverageResultDto from './moving-average-result-dto';

export default class MovingAverageResponseDto {
  @ApiPropertyOptional({
    description:
      '(optional) Contains the information about the symbol if available',
  })
  result?: MovingAverageResultDto;

  @ApiPropertyOptional({
    description:
      '(optional) Contains a human readable message about the result',
  })
  message?: string;
}
