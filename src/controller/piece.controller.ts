import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PieceService } from '../service/piece.service';
import { CreatePieceDto } from '../dto/create-piece.dto'
import { PieceEntity } from '../entity/piece.entity';
import { ParseUuidPipe } from '../pipes/parse-uuid.pipe'

@Controller('piece')
export class PieceController {
  constructor(
    private readonly pieceService: PieceService
    ) {}

  @Post()
  async create(@Body() createPieceDto: CreatePieceDto) {
    console.log("createPieceDto",createPieceDto.video_info);
    var pieceData = this.pieceService.create(createPieceDto)
    return pieceData;
  }

  @Get()
  async findAll() {
    return this.pieceService.findAll();
  }

  @Get('/callback')
  async find() {
    
  }
  @Get()
  findOne() {
    
  }
}