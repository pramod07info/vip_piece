import { Injectable } from '@nestjs/common';
import {
  BaseModel,
  InjectModel,
  uuid,
  InjectConnection,
} from '@iaminfinity/express-cassandra';
import { PieceEntity } from '../entity/piece.entity';
import { CreatePieceDto } from '../dto/create-piece.dto';

@Injectable()
export class PieceService {
  constructor(
    @InjectConnection()
    private readonly connection: any,
    @InjectModel(PieceEntity)
    private readonly pieceModel: BaseModel<PieceEntity>,
  ) {}

  async create(createPieceDto: CreatePieceDto): Promise<PieceEntity> {
    const piece = new this.pieceModel(createPieceDto);
    return await piece.saveAsync();
  }

  async findAll(): Promise<PieceEntity[]> {
    return await this.pieceModel.findAsync({}, { raw: true });
  }

  async findById(id): Promise<PieceEntity> {
    if (typeof id === 'string') {
      id = uuid(id);
    }
    return await this.pieceModel.findOneAsync({ id }, { raw: true });
  }
}