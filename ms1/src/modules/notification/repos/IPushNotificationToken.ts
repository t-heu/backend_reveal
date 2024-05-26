export interface ICreateDTO {
  key: string;
  user_id: string;
}

export interface IPushNotificationTokenRepository {
  addPushNotificationTokens(data: ICreateDTO): Promise<void>;
  deletePushNotificationTokens(key: string): Promise<void>;
  findPushNotificationTokens(userID: string): Promise<any>;
}
