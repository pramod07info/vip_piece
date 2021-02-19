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
  @Post('/update')
  updateUser(@Body() createUsersDto:CreateUsersDto){
    return this.usersService.updateUser(createUsersDto);
  }
  @Post('/login')
  login(@Body() createUsersDto: CreateUsersDto) {
    return  this.usersService.login(createUsersDto);
  }
  @Post('/logout')
  logout(@Body() createUsersTokenDto: CreateUsersTokenDto) {
    try {
      this.usersService.logout(createUsersTokenDto.user_id);
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