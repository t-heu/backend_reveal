export interface ICreateDTO {
  key: string;
  user_id: string;
}

export interface INotificationKeyRepository {
  addNotificationKeys(data: ICreateDTO): Promise<void>;
  deleteNotificationKeys(userID: ICreateDTO): Promise<void>;
}
