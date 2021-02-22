import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Response } from 'express';
import { DailyMotionDto } from 'src/dto/daily-motion.dto';
import { IResponse } from 'src/response/IResponse';
import { DailyMotionService } from 'src/service/dailymotion.service';
@Controller('dailymotion')
export class DailyMotionController {
  constructor(
    private readonly dailyMotionService: DailyMotionService
    
    ) {}
    @Post()
    async create(@Body() dailyMotionDto:DailyMotionDto) {
        var data =  await this.dailyMotionService.getAccessToken(dailyMotionDto)
       return data;
    }
    @Post('/uploadVideo')
    async uploadVideo(@Body() dailyMotionDto:DailyMotionDto) {
        var data =  await this.dailyMotionService.uploadvideo(dailyMotionDto)
       return data;
    }
}