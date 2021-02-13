import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { CreateUsersDto } from '../dto/create-users.dto'
import { UsersEntity } from '../entity/users.entity';
import { ParseUuidPipe } from '../pipes/parse-uuid.pipe'

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
}