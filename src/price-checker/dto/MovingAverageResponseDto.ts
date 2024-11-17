export default interface MovingAverageResponseDto {
  price: number;
  timestamp: Date;
  movingAvarage: number;
  windowSize: number;
}
