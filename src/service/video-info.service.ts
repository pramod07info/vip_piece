import { Inject, Injectable } from '@nestjs/common';
import {
  BaseModel,
  InjectModel,
  uuid,
  InjectConnection,
  errors,
  InjectRepository,
  Repository,
} from '@iaminfinity/express-cassandra';
import { VideoInfoEntity } from '../entity/video-info.entity';
import { CreateUsersDto } from '../dto/create-users.dto';
import { UserTokenService } from './user-token.service';
import { CreateUsersTokenDto } from 'src/dto/create-user-token.dto';
import { IResponse } from 'src/response/IResponse';
import { CreateVideoInfoDto } from 'src/dto/video-info.dto';
@Injectable()
export class VideoInfoService {
  constructor(
    @InjectConnection()
    private readonly connection: any,
    @InjectModel(VideoInfoEntity)
    private readonly videoInfoModel: BaseModel<VideoInfoEntity>,
    private readonly usersTokenService: UserTokenService,
    @InjectRepository(VideoInfoEntity)
    private readonly videoRepository: Repository<VideoInfoEntity>,
  ) { }

  async create(obj): Promise<VideoInfoEntity> {
    let video = await this.videoRepository.save(obj).toPromise();
    return video;
  }

  async findAll(): Promise<VideoInfoEntity[]> {
    return await this.videoInfoModel.findAsync({}, { raw: true });
  }

  async findById(id): Promise<VideoInfoEntity> {
    if (typeof id === 'string') {
      id = uuid(id);
    }
    return await this.videoRepository.findOne({ piece_id:id }, { raw: true,allow_filtering:true }).toPromise();
  }
}