import { Global, HttpModule, Module } from '@nestjs/common';
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
import { DailyMotionService } from 'src/service/dailymotion.service';
import { DailyMotionController } from 'src/controller/daily-motion.controller';

@Global()
@Module({
  imports: [ExpressCassandraModule.forFeature([PieceEntity,UsersEntity,UserTokenEntity,VideoInfoEntity]),HttpModule],
  controllers: [PieceController,UsersController,DailyMotionController],
  providers: [PieceService,UsersService,UserTokenService,VideoInfoService,DailyMotionService],
  exports:[UserTokenService,VideoInfoService,PieceService]

})
export class SubModule {}
