import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { CreateUsersDto } from '../dto/create-users.dto'
import { CreateUsersTokenDto } from '../dto/create-user-token.dto'
import { UsersEntity } from '../entity/users.entity';
import { ParseUuidPipe } from '../pipes/parse-uuid.pipe'
import { UserTokenService } from 'src/service/user-token.service';
import { IResponse } from '../response/IResponse';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(@Body() createUsersDto: CreateUsersDto) {
    return this.usersService.create(createUsersDto);
  }

  @Get()
  async findAll(): Promise<UsersEntity[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUuidPipe()) id) {
    return this.usersService.findById(id);
  }
  @Post('/login')
  login(@Body() createUsersDto: CreateUsersDto) {
    let user = this.usersService.login(createUsersDto);
    return user;
    //try {
     
    //   user.then(function (result) {
        
    //   //   if (result.token) {
    //   //     console.log("tokenddd ",result)
    //   //     const iResponse: IResponse = {
    //   //       statusCode: "200",
    //   //       message: "Successfully Login",
            
    //   //     }
    //   //     return iResponse;
    //   //   } else {
    //   //     const iResponse: IResponse = {
    //   //       statusCode: "200",
    //   //       message: "Successfully Login",
    //   //       data: result
    //   //     }
    //   //     return iResponse;
    //   //   }
    //   // })
      
    // } catch (error) {
    //   console.error(error.message);
    //   const iResponse: IResponse = {
    //     statusCode: "500",
    //     message: "Something went worng",
    //     error: error.message
    //   }
    //   return iResponse;
    //}
  }
  @Post('/logout')
  logout(@Body() createUsersTokenDto: CreateUsersTokenDto) {
    try {
      this.usersService.logout(createUsersTokenDto.userId);
      const iResponse: IResponse = {
        statusCode: "200",
        message: "Successfully Logout"
      }
      return iResponse;
    } catch (error) {
      console.error(error.message);
      const iResponse: IResponse = {
        statusCode: "500",
        message: "Something went worng",
        error: error.message
      }
      return iResponse;
    }
  }
}