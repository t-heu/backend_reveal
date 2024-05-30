import { Notification } from '@/modules/notification/domain/notification';

export interface IResponseAndCount {
  result: Notification[];
  total: number;
}

export interface FindAndCountDTO {
  userID: string;
  skip: number;
}

export interface INotificationRepository {
  createNotification(data: Notification): Promise<void>;
  getAllNotification(param: FindAndCountDTO): Promise<IResponseAndCount>;
  getCountNotificationNotRead(userID: string): Promise<number>;
  updateNotificationRead(userID: string): Promise<void>;
}
