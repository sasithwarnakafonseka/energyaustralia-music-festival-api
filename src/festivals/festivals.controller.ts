import { Controller, Get, Logger } from '@nestjs/common';
import { FestivalsService } from './festivals.service';
import { Festival } from './interfaces';
import { logger } from 'src/logging.config';

@Controller('music_festivals')
export class FestivalsController {
  private readonly logger = new Logger(FestivalsController.name);
  constructor(private readonly festivalsService: FestivalsService) {}

  @Get()
  async getMusicFestivalsData(): Promise<any> {
    try {
      const festivalsData: Festival[] = await this.festivalsService
        .getFestivalsData()
        .toPromise();
      const formattedData = this.formatData(festivalsData);
      return formattedData;
    } catch (error) {
      logger.error('Error', {
        additionalInfo: error,
      });
    }
  }

  private formatData(festivalsData: Festival[]): any[] {
    try {
      const recordLabels: {
        [labelId: string]: {
          label: string;
          bands: { name: string; festivals: { name: string }[] }[];
        };
      } = {};

      festivalsData.forEach((festival) => {
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

      return formattedData;
    } catch (error) {
      logger.error('Error', {
        additionalInfo: error,
      });
    }
  }
}
