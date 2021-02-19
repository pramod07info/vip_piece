import { Inject, Injectable } from '@nestjs/common';
import {
  BaseModel,
  InjectModel,
  uuid,
  InjectConnection,
  errors,
} from '@iaminfinity/express-cassandra';
import { UsersEntity } from '../entity/users.entity';
import { CreateUsersDto } from '../dto/create-users.dto';
import { UserTokenService } from './user-token.service';
import { CreateUsersTokenDto } from 'src/dto/create-user-token.dto';
import { IResponse } from 'src/response/IResponse';
@Injectable()
export class UsersService {
  constructor(
    // @InjectConnection()
    // private readonly connection: any,
    @InjectModel(UsersEntity)
    private readonly usersModel: BaseModel<UsersEntity>,
    private readonly usersTokenService: UserTokenService
  ) { }

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
  async updateUser(createUsersDto: CreateUsersDto) {
    try {
      // if (typeof createUsersDto.id === 'string') {
      //   createUsersDto.id = uuid(createUsersDto.id);
      // }
      let userData = await this.usersModel.findOneAsync({ id: uuid(createUsersDto.id) }, { raw: true });
      if (userData != null) {
        this.usersModel.update({ id: uuid(createUsersDto.id) }, { email_id: createUsersDto.email_id, name: createUsersDto.name, mobile: createUsersDto.mobile, is_active: createUsersDto.is_active, roles: createUsersDto.roles });
        let user = await this.usersModel.findOneAsync({ id: uuid(createUsersDto.id) }, { raw: true });
        if (user) {
          const iResponse: IResponse = {
            statusCode: "200",
            message: "User updated successfuly",
            data: user
          }
          return iResponse;
        } else {
          const iResponse: IResponse = {
            statusCode: "200",
            message: "User not updated successfuly",
            data: ""
          }
          return iResponse;
        }
      } else {
        const iResponse: IResponse = {
          statusCode: "200",
          message: "User not found.",
          data: ""
        }
        return iResponse;
      }


    } catch (error) {
      const iResponse: IResponse = {
        statusCode: "200",
        message: error.message,
        data: ""
      }
      return iResponse;
    }

  }
  async login(createUsersDto: CreateUsersDto) {
    try {
      console.log("create User Dto", createUsersDto.email_id)
      console.log("create User Dto", createUsersDto.password)

      let userResult = await this.usersModel.findOneAsync({ email_id: createUsersDto.email_id, password: createUsersDto.password }, { raw: true, allow_filtering: true, select: ['id', 'name', 'nick_name', 'roles'] });
      let tokens = {
        token: "",
        userId: ""
      }
      if (userResult != null) {
        let tokenDataResult = await this.usersTokenService.findByUserId(userResult.id);
        if (tokenDataResult != null) {
          tokens.token = tokenDataResult.token_data;
          tokens.userId = tokenDataResult.user_id;
          console.log("userResult", tokenDataResult);
          const iResponse: IResponse = {
            statusCode: "200",
            message: "Login successfully",
            data: tokens
          }
          return iResponse;
        } else {
          let createUsersTokenDto = new CreateUsersTokenDto();
          createUsersTokenDto.user_id = userResult.id;
          createUsersTokenDto.token_data = uuid() + "" + uuid();
          createUsersTokenDto.is_active = true;
          await this.usersTokenService.create(createUsersTokenDto);
          tokens.token = createUsersTokenDto.token_data;
          tokens.userId = createUsersTokenDto.user_id;
          tokens.token = tokenDataResult.token_data;
          tokens.userId = tokenDataResult.user_id;
          console.log("userResult", tokenDataResult);
          const iResponse: IResponse = {
            statusCode: "200",
            message: "Login successfully",
            data: tokens
          }
          return iResponse;
        }
      } else {
        const iResponse: IResponse = {
          statusCode: "200",
          message: "Emailid Or Password not matched",
          data: tokens
        }
        return iResponse;
      }
    } catch (error) {
      const iResponse: IResponse = {
        statusCode: "200",
        message: error.message,
        data: ""
      }
      return iResponse;
    }
  }
  async logout(id) {
    try {
      let tokenDataResult = await this.usersTokenService.updateTokenStatus(id);
    } catch (error) {
      const iResponse: IResponse = {
        statusCode: "200",
        message: error.message,
        data: ""
      }
      return iResponse;
    }
    
  }

}