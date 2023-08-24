import { Test, TestingModule } from '@nestjs/testing';
import { FestivalsController } from './festivals.controller';
import { FestivalsService } from './festivals.service';
import { Festival, Band } from './interfaces';
import { from, lastValueFrom } from 'rxjs';

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
        name: 'A 3',
        bands: [
          { name: 'B Band X', recordLabel: 'Label 1' },
          { name: 'C Band X', recordLabel: 'Label 1' },
          { name: 'A Band X', recordLabel: 'Label 1' },
        ],
      },
      {
        name: 'Z 1',
        bands: [{ name: 'Z Band X', recordLabel: 'Label 1' }],
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

  const expectedData: Festival[] = [
    {
      name: 'A 3',
      bands: [
        { name: 'A Band X', recordLabel: 'Label 1' },
        { name: 'B Band X', recordLabel: 'Label 1' },
        { name: 'C Band X', recordLabel: 'Label 1' },
      ],
    },
    {
      name: 'Festival 1',
      bands: [{ name: 'Band X', recordLabel: 'Label 1' }],
    },
    {
      name: 'Festival 2',
      bands: [{ name: 'Band X2', recordLabel: 'Label 2' }],
    },
    {
      name: 'Z 1',
      bands: [{ name: 'Z Band X', recordLabel: 'Label 1' }],
    },
  ];

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
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });

    it('should return data', async () => {
      // Call the controller's method
      const result = await controller.getMusicFestivalsData();
      const dataFormat = JSON.parse(result);
      // Compare the actual result with the expected data
      expect(dataFormat).toEqual(expectedData);
    });

    it('should return formatted data', async () => {
      // Call the controller's method and expect the result to match the expected data
      const result = await controller.getMusicFestivalsData();
      const dataFormat = JSON.parse(result);
      const testRowData = festivalsService.getFestivalsData();

      const festivalsObservable = from(testRowData);

      // Use the lastValueFrom() operator to get the last festival
      const lastFestival = await lastValueFrom(festivalsObservable);

      const resultFormatData = await controller.formatData(lastFestival);
      const dataFormatData = JSON.parse(resultFormatData);
      expect(dataFormat).toEqual(dataFormatData);
    });

    it('should return formatted data', async () => {
      // Call the controller's method and expect the result to match the expected data
      const testRowData = festivalsService.getFestivalsData();

      const festivalsObservable = from(testRowData);

      // Use the lastValueFrom() operator to get the last festival
      const lastFestival = await lastValueFrom(festivalsObservable);

      const resultFormatData = await controller.formatData(lastFestival);
      const dataFormatData = JSON.parse(resultFormatData);
      expect(expectedData).toEqual(dataFormatData);
    });
  });
});
