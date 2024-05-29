export interface CreateDTO {
  provideruserID: string;
  providerName: string;
  userID: string;
}

export interface IExternalAuthRepository {
  findLoginSocialOrCreate(data: CreateDTO): Promise<void>;
}
