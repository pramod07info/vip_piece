import { Global, Injectable } from '@nestjs/common';
import {
  BaseModel,
  InjectModel,
  uuid,
  InjectConnection,
} from '@iaminfinity/express-cassandra';
import { UserTokenEntity } from '../entity/user-token.entity';
import { CreateUsersDto } from '../dto/create-users.dto';
import { CreateUsersTokenDto } from '../dto/create-user-token.dto';
import { promises } from 'fs';

@Injectable()
export class UserTokenService {
  
  constructor(
    @InjectConnection()
    private readonly connection: any,
    
    @InjectModel(UserTokenEntity)
    private readonly usersTokenModel: BaseModel<UserTokenEntity>,
  ) {}
  
  async create(createUsersTokenDto: CreateUsersTokenDto): Promise<UserTokenEntity> {
    const userTokens = await new this.usersTokenModel(createUsersTokenDto);
    return await userTokens.saveAsync();
  }
  
  async findAll(): Promise<UserTokenEntity[]> {
    return await this.usersTokenModel.findAsync({}, { raw: true });
  }

  async findById(id): Promise<UserTokenEntity> {
    if (typeof id === 'string') {
      id = uuid(id);
    }
    return await this.usersTokenModel.findOneAsync({ id }, { raw: true });
  }
  async findByUserId(id): Promise<UserTokenEntity> {    
    return await this.usersTokenModel.findOneAsync({ user_id:id,is_active:true }, { raw: true ,select:['id','user_id','token_data'],allow_filtering:true});
  }
  async updateTokenStatus(id) {
        if (typeof id === 'string') {
            id = uuid(id);
        }
        let tokenData =   await this.usersTokenModel.findOneAsync({ user_id:id,is_active:true }, { raw: true ,select:['id','user_id','token_data'],allow_filtering:true});
        if(tokenData != null){
            await this.usersTokenModel.update({id:tokenData.id,user_id:id},{is_active:false})
        }  
    }
}

