import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Res,
} from '@nestjs/common';
import { FestivalsService } from './festivals.service';
import { from, lastValueFrom } from 'rxjs';

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
      return await this.formatData(lastFestival);
    } catch (error) {
      this.logger.error('Error', {
        additionalInfo: error,
      });
      throw new HttpException(
        'Something warning please try again shortly.',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
  }

  async formatData(festivalsData: any): Promise<any> {
    // Sort the festivals by name
    festivalsData?.sort((a, b) => a?.name.localeCompare(b?.name));

    // Sort the bands within each festival by name
    festivalsData?.forEach((festival) => {
      festival?.bands?.sort((a, b) => a?.name.localeCompare(b?.name));
    });
    // Log the sorted JSON array
    return JSON.stringify(festivalsData, null, 2);
  }
}
