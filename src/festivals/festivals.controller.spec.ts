// import { Test, TestingModule } from '@nestjs/testing';
// import { FestivalsController } from './festivals.controller';
// import { FestivalsService } from './festivals.service';
// import { Festival } from './interfaces';

// describe('FestivalsController', () => {
//   let controller: FestivalsController;
//   let festivalsService: FestivalsService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [FestivalsController],
//       providers: [FestivalsService],
//     }).compile();

//     controller = module.get<FestivalsController>(FestivalsController);
//     festivalsService = module.get<FestivalsService>(FestivalsService);
//   });

//   describe('getMusicFestivalsData', () => {
//     it('should return formatted data', async () => {
//       const festivalsData = [
//         {
//           name: 'Festival 1',
//           bands: [{ name: 'Band X', recordLabel: 'Label 1' }],
//         },
//         {
//           name: 'Festival 2',
//           bands: [{ name: 'Band X2', recordLabel: 'Label ' }],
//         },
//       ] as Festival[];

//       jest
//         .spyOn(festivalsService, 'getFestivalsData')
//         .mockResolvedValue(festivalsData);

//       const expectedFormattedData = [];

//       const result = await controller.getMusicFestivalsData();
//       expect(result).toEqual(expectedFormattedData);
//     });

//     it('should handle an empty response', async () => {
//       jest.spyOn(festivalsService, 'getFestivalsData').mockResolvedValue([]);

//       const result = await controller.getMusicFestivalsData();
//       expect(result).toEqual([]);
//     });
//   });
// });
