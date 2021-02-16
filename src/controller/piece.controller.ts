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
    return this.pieceService.create(createPieceDto);
  }

  @Get()
  async findAll(): Promise<PieceEntity[]> {
    return this.pieceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUuidPipe()) id) {
    return this.pieceService.findById(id);
  }
}