import { CreateVideoInfoDto } from "./video-info.dto";

export class DailyMotionDto {
    public grant_type: string;
    public client_id: string;
    public client_secret: number;
    public username: string;
    public password: string;
    public token: string;
    public channel: string;
    public title: string;
    public url: string;
    public published: string;
}