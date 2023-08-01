import { Controller, Get, Logger } from '@nestjs/common';
import { FestivalsService } from './festivals.service';
import { Festival } from './interfaces';
import { firstValueFrom, from, lastValueFrom } from 'rxjs';

@Controller('music_festivals')
export class FestivalsController {
  private readonly logger = new Logger(FestivalsController.name);

  constructor(private readonly festivalsService: FestivalsService) {}
  @Get()
  async getMusicFestivalsData(): Promise<any> {
    try {
      const festivalsData = this.festivalsService.getFestivalsData();

      // Create an Observable from the festivalsData array
      const festivalsObservable = from(festivalsData);

      // Use the lastValueFrom() operator to get the last festival
      const lastFestival = await lastValueFrom(festivalsObservable);

      return lastFestival;
    } catch (error) {
      this.logger.error('Error', {
        additionalInfo: error,
      });
      return []; // Add this default return value in case of an error to avoid returning undefined
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
      this.logger.error('Error', {
        additionalInfo: error,
      });
      return []; // Add this default return value in case of an error to avoid returning undefined
    }
  }
}
