import { Injectable } from '@nestjs/common';
import {
  BaseModel,
  InjectModel,
  uuid,
  InjectConnection,
} from '@iaminfinity/express-cassandra';
import { PieceEntity } from './entity/piece.entity';
import { CreatePieceDto } from './dto/create-piece.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectConnection('vip')
    private readonly connection: any,
    // inject CatEntity from connection=test2
    @InjectModel(PieceEntity) private readonly pieceModel: BaseModel<PieceEntity>,
  ) {}

  async create(createPieceDto: CreatePieceDto): Promise<PieceEntity> {
    const cat = new this.pieceModel(createPieceDto);
    return await cat.saveAsync();
  }

  async findById(id): Promise<PieceEntity> {
    if (typeof id === 'string') {
      id = uuid(id);
    }
    return await this.pieceModel.findOneAsync({ id }, { raw: true });
  }
}