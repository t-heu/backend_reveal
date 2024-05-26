export interface ICreateDTO {
  provideruserID: string;
  providerName: string;
  userID: string;
}

export interface IExternalAuthRepository {
  findLoginSocialOrCreate(data: ICreateDTO): Promise<void>;
}
