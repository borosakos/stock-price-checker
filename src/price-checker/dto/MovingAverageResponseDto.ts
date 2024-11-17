export default interface MovingAverageResponseDto {
  result?: {
    price: number;
    timestamp: Date;
    movingAvarage?: number;
    windowSize: number;
  };
  message?: string;
}
