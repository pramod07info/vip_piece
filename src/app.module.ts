import { Module } from '@nestjs/common';
import { ExpressCassandraModule } from '@iaminfinity/express-cassandra';
import { PieceModule } from './module/piece.module';
import { ConfigService } from './config/config.service';
import { ConfigModule } from './config/config.module';
import { PieceEntity } from './entity/piece.entity';
import { AppService } from './app.service';
import { UsersEntity } from './entity/users.entity';
import { UserTokenEntity } from './entity/user-token.entity';
import { UserTokenService } from './service/user-token.service';
import { UsersService } from './service/users.service';
import { PieceService } from './service/piece.service';

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
    ExpressCassandraModule.forFeature([PieceEntity,UsersEntity,UserTokenEntity], 'vip'),
    PieceModule,
  ],
 // providers: [AppService,UserTokenService,UsersService,PieceService],
})
export class AppModule {}
