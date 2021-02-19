import { Injectable } from '@nestjs/common';
import {
	BaseModel,
	InjectModel,
	uuid,
	InjectConnection,
	Repository,
	InjectRepository,
	errors,
} from '@iaminfinity/express-cassandra';
import { PieceEntity } from '../entity/piece.entity';
import { CreatePieceDto } from '../dto/create-piece.dto';
import { VideoInfoService } from './video-info.service';
import { VideoInfoEntity } from 'src/entity/video-info.entity';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { CreateVideoInfoDto } from 'src/dto/video-info.dto';
import { IResponse } from 'src/response/IResponse';
import { pipe } from 'rxjs';

@Injectable()
export class PieceService {
	constructor(
		@InjectConnection()
		private readonly connection: any,
		@InjectModel(PieceEntity)
		private readonly pieceModel: BaseModel<PieceEntity>,
		private readonly videoInfoService: VideoInfoService,
		@InjectRepository(PieceEntity)
		private readonly pieceRepository: Repository<PieceEntity>,
	) { }

	async create(createPieceDto: CreatePieceDto) {
		try {
			createPieceDto.source_piece = JSON.stringify(createPieceDto.source_piece);
			const piece = new this.pieceModel(createPieceDto);

			let pieceData = await this.pieceRepository.save(piece).toPromise();
			let videoInfo = createPieceDto.video_info
			let videoStore:any[] = new Array();
			if (pieceData.id != null) {
				for (let vedioData of videoInfo) {
					let videoData = {
						video_url: "",
						piece_id: [],
						sentences: ""
					}
					videoData.sentences = JSON.stringify(vedioData.sentences);
					videoData.video_url = vedioData.videoUrl;
					videoData.piece_id = pieceData.id;
          let result = await this.videoInfoService.create(videoData);
          result.sentences = JSON.parse(result.sentences);
          videoStore.push(result);
				}
				
			}

			console.log("videoStore data: ", videoStore.length);
			let obj = JSON.parse(pieceData.source_piece);
			pieceData.source_piece = obj;
			createPieceDto.id = pieceData.id
			createPieceDto.category_id = pieceData.category_id
			createPieceDto.status = pieceData.status
			createPieceDto.title = pieceData.title
			createPieceDto.user_id = pieceData.user_id
			createPieceDto.source_piece = pieceData.source_piece
			createPieceDto.video_info = videoStore
			const iResponse: IResponse = {
				statusCode: "200",
				message: "Piece Created Successfully",
				data: createPieceDto
			}
			return iResponse;

		} catch (error) {
			const iResponse: IResponse = {
				statusCode: "200",
				message: error.message,
				data: ""
			}
			return iResponse;
		}
	}

	 async findAll() {
		try {
			let createPieceDtoArray:CreatePieceDto[] = new Array();
			let pieces =  await this.pieceRepository.find({}, { raw: true }).toPromise();
			if(pieces.length > 0){
				for(let piece of pieces){
					let videoInfo =  await this.videoInfoService.findById(piece.id);
					if(videoInfo != null){						
						
						console.log("video ",videoInfo);
						let createPieceDto:CreatePieceDto;
						createPieceDto.id = piece.id;
						
						createPieceDto.category_id = piece.category_id;
						createPieceDto.title = piece.title;
						createPieceDto.user_id = piece.user_id;
						createPieceDto.source_piece = piece.source_piece;
						createPieceDto.video_info = videoInfo;
						createPieceDtoArray.push(createPieceDto);
					}
				}
				const iResponse: IResponse = {
					statusCode: "200",
					message:"Fetch Successfully data",
					data: pieces
				}
				return iResponse;
			}
			
		} catch (error) {
			const iResponse: IResponse = {
				statusCode: "200",
				message:error.message
			}
			return iResponse;
		}
		
	}

	async findById(id): Promise<PieceEntity> {
		if (typeof id === 'string') {
			id = uuid(id);
		}
		return await this.pieceModel.findOneAsync({ id }, { raw: true });
	}
}
