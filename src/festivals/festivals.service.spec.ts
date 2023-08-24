import { Test, TestingModule } from '@nestjs/testing';
import { FestivalsService } from './festivals.service';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';

// Mock HttpService and its get method
class HttpServiceMock {
  get(): any {
    // Create a mock response
    const response = {
      data: [
        {
          name: 'Festival 1',
          bands: [{ name: 'Band X', recordLabel: 'Label 1' }],
        },
        {
          name: 'Festival 2',
          bands: [{ name: 'Band X2', recordLabel: 'Label 2' }],
        },
      ],
    };
    // Return an observable that emits the mock response
    return of(response);
  }
}

describe('FestivalsService', () => {
  let service: FestivalsService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FestivalsService,
        { provide: HttpService, useClass: HttpServiceMock },
      ],
    }).compile();

    service = module.get<FestivalsService>(FestivalsService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getFestivalsData', () => {
    it('should return festivals data', (done) => {
      // Test Case : check service getFestivalsData function is returning data
      // Spy on the HttpService get method to ensure it's called
      const httpServiceSpy = jest.spyOn(httpService, 'get');

      // Call the service's method
      const festivalsData$ = service.getFestivalsData();

      // Subscribe to the observable and check the emitted value
      festivalsData$.subscribe((data) => {
        expect(data).toBeDefined();
        expect(Array.isArray(data)).toBeTruthy();
        expect(data.length).toBe(2); // The length of the mock response
        expect(httpServiceSpy).toHaveBeenCalled(); // Ensure the get method is called
        done();
      });
    });
  });
});
