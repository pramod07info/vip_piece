import { Global, Module } from '@nestjs/common';
import { ExpressCassandraModule } from '@iaminfinity/express-cassandra';
import { PieceEntity, } from '../entity/piece.entity';
import { UsersEntity, } from '../entity/users.entity';
import { UserTokenEntity} from '../entity/user-token.entity';
import { PieceService } from '../service/piece.service';
import { PieceController } from '../controller/piece.controller';
import { UsersController } from 'src/controller/UsersController';
import { UsersService } from 'src/service/users.service';
import { UserTokenService } from 'src/service/user-token.service';
import { VideoInfoService } from 'src/service/video-info.service';
import { VideoInfoEntity } from 'src/entity/video-info.entity';

@Global()
@Module({
  imports: [ExpressCassandraModule.forFeature([PieceEntity,UsersEntity,UserTokenEntity,VideoInfoEntity])],
  controllers: [PieceController,UsersController],
  providers: [PieceService,UsersService,UserTokenService,VideoInfoService],
  exports:[UserTokenService,VideoInfoService,PieceService]

})
export class SubModule {}
