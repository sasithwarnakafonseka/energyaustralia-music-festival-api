import { HttpException, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Festival } from './interfaces';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class FestivalsService {
  private readonly apiUrl =
    'https://eacp.energyaustralia.com.au/codingtest/api/v1/festivals';

  constructor(private readonly httpService: HttpService) {}

  getFestivalsData(): Observable<Festival[]> {
    try {
      return this.httpService.get(this.apiUrl).pipe(
        map((response: AxiosResponse<any>) => {
          return response.data;
        }),
      );
    } catch (error) {
      // Handle the error here, you can log it or return a default response
      console.error('Error fetching festivals data:', error);
      throw new Error('Failed to fetch festivals data');
    }
  }
}
