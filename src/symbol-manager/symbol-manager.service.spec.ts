import { Test, TestingModule } from '@nestjs/testing';
import { SymbolManagerService } from './symbol-manager.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Observed } from './entities/observed.entity';

describe('SymbolManagerService', () => {
  let service: SymbolManagerService;
  const mockObservedRepository = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SymbolManagerService,
        {
          provide: getRepositoryToken(Observed),
          useValue: mockObservedRepository,
        },
      ],
    }).compile();

    service = module.get<SymbolManagerService>(SymbolManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return the saved symbol if symbol is available', async () => {
    // Given
    const observed = {
      id: 1,
      symbol: 'AAPL',
    };
    jest.spyOn(mockObservedRepository, 'findOne').mockReturnValue(observed);

    // When
    const result = await service.get();

    // Then
    expect(result).toEqual({ symbol: observed.symbol });
  });

  it('should return undifined if symbol is not available', async () => {
    // Given
    jest.spyOn(mockObservedRepository, 'findOne').mockReturnValue(undefined);

    // When
    const result = await service.get();

    // Then
    expect(result).toEqual({ symbol: undefined });
  });
});
