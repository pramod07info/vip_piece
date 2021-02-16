import { Inject, Injectable } from '@nestjs/common';
import {
  BaseModel,
  InjectModel,
  uuid,
  InjectConnection,
} from '@iaminfinity/express-cassandra';
import { UsersEntity } from '../entity/users.entity';
import { CreateUsersDto } from '../dto/create-users.dto';
import { UserTokenService } from './user-token.service';
import { CreateUsersTokenDto } from 'src/dto/create-user-token.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectConnection()
    private readonly connection: any,
    @InjectModel(UsersEntity)
    private readonly usersModel: BaseModel<UsersEntity>,
    private readonly usersTokenService:UserTokenService
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
  async login(createUsersDto:CreateUsersDto){
    console.log("create User Dto", createUsersDto.emailId)
    console.log("create User Dto", createUsersDto.password)
    
    let userResult = await this.usersModel.findOneAsync({emailId:createUsersDto.emailId,password:createUsersDto.password},{raw: true,allow_filtering:true,select:['id','name','nickName','roles']});
    if(userResult != null){
      let tokens ={
        token:"",
        userId:""
      }
      let tokenDataResult = await this.usersTokenService.findByUserId(userResult.id);  
      if(tokenDataResult != null){
        tokens.token = tokenDataResult.tokenData;
        tokens.userId = tokenDataResult.userId;
        return tokens;
      }else{
        let createUsersTokenDto = new CreateUsersTokenDto();
        
        createUsersTokenDto.userId = userResult.id; //'++';
        createUsersTokenDto.tokenData = uuid()+""+ uuid();
        createUsersTokenDto.isActive = true;
        this.usersTokenService.create(createUsersTokenDto);
        tokens.token = createUsersTokenDto.tokenData;
        tokens.userId = createUsersTokenDto.userId;
        return tokens;
      }
    }
    
  }
  async  logout(id) {
    console.log("id ",id)  
    let tokenDataResult = await this.usersTokenService.updateTokenStatus(id);  
  }
  
}