import { CreateVideoInfoDto } from "./video-info.dto";

export class CreatePieceDto {
  public id: string;
  public title: string;
  public category_id: number;
  public status: string;
  public user_id: string;
    public video_info:any;
    public  source_piece: any;
  }