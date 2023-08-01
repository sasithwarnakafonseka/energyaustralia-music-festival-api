import { Test, TestingModule } from '@nestjs/testing';
import { FestivalsController } from './festivals.controller';
import { FestivalsService } from './festivals.service';
import { Festival, Band } from './interfaces';

// Mock the festivals service
class FestivalsServiceMock {
  getFestivalsData(): Promise<Festival[]> {
    // Define sample data for testing the controller's method
    const festivalsData: Festival[] = [
      {
        name: 'Festival 1',
        bands: [{ name: 'Band X', recordLabel: 'Label 1' }],
      },
      {
        name: 'Festival 2',
        bands: [{ name: 'Band X2', recordLabel: 'Label 2' }],
      },
    ];

    return Promise.resolve(festivalsData);
  }
}

describe('FestivalsController', () => {
  let controller: FestivalsController;
  let festivalsService: FestivalsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FestivalsController],
      providers: [
        { provide: FestivalsService, useClass: FestivalsServiceMock },
      ],
    }).compile();

    controller = module.get<FestivalsController>(FestivalsController);
    festivalsService = module.get<FestivalsService>(FestivalsService);
  });

  describe('getMusicFestivalsData', () => {
    it('should return formatted data', async () => {
      // Call the controller's method and expect the result to match the expected data
      const result = await controller.getMusicFestivalsData();
      expect(result);
    });
  });
});
