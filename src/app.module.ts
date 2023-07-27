import { Module } from '@nestjs/common';
import { FestivalsService } from './festivals/festivals.service';
import { FestivalsController } from './festivals/festivals.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [FestivalsController],
  providers: [FestivalsService],
})
export class AppModule {}
