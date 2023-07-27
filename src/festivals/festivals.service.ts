import { Injectable } from '@nestjs/common';
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
    return this.httpService.get(this.apiUrl).pipe(
      map((response: AxiosResponse<any>) => {
        return response.data;
      }),
    );
  }
}
