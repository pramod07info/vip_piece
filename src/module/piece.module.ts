import { Module } from '@nestjs/common';
import { ExpressCassandraModule } from '@iaminfinity/express-cassandra';
import { PieceEntity, } from '../entity/piece.entity';
import { UsersEntity, } from '../entity/users.entity';
import { PieceService } from '../service/piece.service';
import { PieceController } from '../controller/piece.controller';
import { pipe } from 'rxjs';
import { UsersController } from 'src/controller/UsersController';
import { UsersService } from 'src/service/users.service';

@Module({
  imports: [ExpressCassandraModule.forFeature([PieceEntity,UsersEntity])],
  controllers: [PieceController,UsersController],
  providers: [PieceService,UsersService],
})
export class PieceModule {}