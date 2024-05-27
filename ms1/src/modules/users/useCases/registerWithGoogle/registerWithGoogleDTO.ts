import { User } from '@/modules/users/domain/user';

export interface RegisterWithGoogleDTO {
  accessTokenGoogle: string;
  /* email: string;
  photo: string;
  name: string;
  provideruserID: string;
  providerName: string; */
}

export interface ResponseDTO {
  user: User;
  accessToken: string;
}
