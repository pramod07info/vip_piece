import { Module } from '@nestjs/common';
import { ExpressCassandraModule } from '@iaminfinity/express-cassandra';
import { PieceModule } from './module/piece.module';
import { ConfigService } from './config/config.service';
import { ConfigModule } from './config/config.module';
import { PieceEntity } from './entity/piece.entity';
import { AppService } from './app.service';
import { UsersEntity } from './entity/users.entity';

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
    ExpressCassandraModule.forFeature([PieceEntity,UsersEntity], 'vip'),
    PieceModule,
  ],
  providers: [AppService],
})
export class AppModule {}
