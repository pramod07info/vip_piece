import { Injectable } from '@nestjs/common';
import {
  BaseModel,
  InjectModel,
  uuid,
  InjectConnection,
} from '@iaminfinity/express-cassandra';
import { UsersEntity } from '../entity/users.entity';
import { CreateUsersDto } from '../dto/create-users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectConnection()
    private readonly connection: any,
    @InjectModel(UsersEntity)
    private readonly usersModel: BaseModel<UsersEntity>,
  ) {}

  async create(createUsersDto: CreateUsersDto): Promise<UsersEntity> {
    const piece = new this.usersModel(createUsersDto);
    return await piece.saveAsync();
  }

  async findAll(): Promise<UsersEntity[]> {
    return await this.usersModel.findAsync({}, { raw: true });
  }

  async findById(id): Promise<UsersEntity> {
    if (typeof id === 'string') {
      id = uuid(id);
    }
    return await this.usersModel.findOneAsync({ id }, { raw: true });
  }
}