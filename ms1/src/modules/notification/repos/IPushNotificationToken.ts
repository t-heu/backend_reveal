export interface CreateDTO {
  key: string;
  user_id: string;
}

export interface IPushNotificationTokenRepository {
  addPushNotificationTokens(data: CreateDTO): Promise<void>;
  deletePushNotificationTokens(key: string): Promise<void>;
  findPushNotificationTokens(userID: string): Promise<any>;
}
