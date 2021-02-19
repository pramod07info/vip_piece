import { Module } from '@nestjs/common';
import { ExpressCassandraModule } from '@iaminfinity/express-cassandra';
import { ConfigService } from './config/config.service';
import { ConfigModule } from './config/config.module';
import { PieceEntity } from './entity/piece.entity';
import { AppService } from './app.service';
import { UsersEntity } from './entity/users.entity';
import { UserTokenEntity } from './entity/user-token.entity';
import { UserTokenService } from './service/user-token.service';
import { UsersService } from './service/users.service';
import { PieceService } from './service/piece.service';
import { SubModule } from './module/sub.module';
import { VideoInfoEntity } from './entity/video-info.entity';

@Module({
  imports: [
    ExpressCassandraModule.forRootAsync({
      useClass: ConfigService,
    }),
    ExpressCassandraModule.forRootAsync({
      name: 'vip',
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.getDbConfig2(),
      inject: [ConfigService],
    }),
    ExpressCassandraModule.forFeature([PieceEntity,UsersEntity,UserTokenEntity,VideoInfoEntity], 'vip'),
    SubModule,
  ],
  
  //providers: [AppService,UserTokenService,UsersService,PieceService],

})
export class AppModule {}
