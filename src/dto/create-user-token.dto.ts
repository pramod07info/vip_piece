export class CreateUsersTokenDto {
    private  _userId: string;
    private  _tokenData: string;
    private  _isActive: boolean;

    public get userId() {
      return this._userId;
    }

    public set userId(theUserId: string) {
        this._userId = theUserId;
    }

    public get tokenData() {
      return this._tokenData;
    }

    public set tokenData(theTokenData: string) {
        this._tokenData = theTokenData;
    }

    public get isActive() {
      return this._isActive;
    }

    public set isActive(theIsActive: boolean) {
        this._isActive = theIsActive;
    }

  }