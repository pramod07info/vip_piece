import { Global, Module } from '@nestjs/common';
import { ExpressCassandraModule } from '@iaminfinity/express-cassandra';
import { PieceEntity, } from '../entity/piece.entity';
import { UsersEntity, } from '../entity/users.entity';
import { UserTokenEntity} from '../entity/user-token.entity';
import { PieceService } from '../service/piece.service';
import { PieceController } from '../controller/piece.controller';
import { pipe } from 'rxjs';
import { UsersController } from 'src/controller/UsersController';
import { UsersService } from 'src/service/users.service';
import { UserTokenService } from 'src/service/user-token.service';

@Global()
@Module({
  imports: [ExpressCassandraModule.forFeature([PieceEntity,UsersEntity,UserTokenEntity])],
  controllers: [PieceController,UsersController],
  providers: [PieceService,UsersService,UserTokenService],
  exports:[UserTokenService]

})
export class PieceModule {}
