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

      const recordLabels: {
        [labelId: string]: {
          label: string;
          bands: { name: string; festivals: { name: string }[] }[];
        };
      } = {};
      result.forEach((festival) => {
        festival.bands.forEach((band) => {
          const labelId = band.recordLabel;
          const bandName = band.name;

          if (!recordLabels[labelId]) {
            recordLabels[labelId] = {
              label: `Record Label ${labelId}`,
              bands: [],
            };
          }

          const bandEntry = { name: bandName, festivals: [] };
          recordLabels[labelId].bands.push(bandEntry);

          bandEntry.festivals = festival.name ? [{ name: festival.name }] : [];
        });
      });

      // Convert the object to an array and sort the data alphabetically
      const formattedData = Object.values(recordLabels).sort((a, b) =>
        a.label.localeCompare(b.label),
      );

      formattedData.forEach((label) => {
        label.bands.sort((a, b) =>
          (a.name as string).localeCompare(b.name as string),
        );
        label.bands.forEach((band) => {
          band.festivals.sort((a, b) =>
            ((a.name || '') as string).localeCompare((b.name || '') as string),
          );
        });
      });

      expect(result).toEqual(formattedData);
    });
  });
});
