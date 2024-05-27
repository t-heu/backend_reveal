import { INotis } from '@/modules/notification/dtos/INoti';

export interface GetAllHidesPostDTO {
  skip: number;
  userID: string;
}

export interface ResponseDTO {
  notifications: INotis[];
  count: number;
}
