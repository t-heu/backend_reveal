import { Notis } from '@/modules/notification/dtos/Noti';

export interface GetAllHidesPostDTO {
  skip: number;
  userID: string;
}

export interface ResponseDTO {
  notifications: Notis[];
  count: number;
}
