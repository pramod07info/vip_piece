export class CreateUsersDto {
    readonly id: string;
    readonly name: string;
    readonly nickName: string;
    readonly emailId: string;
    readonly mobile: string;
    readonly password: string;
    readonly isActive: boolean;
    readonly roles: any;
  }