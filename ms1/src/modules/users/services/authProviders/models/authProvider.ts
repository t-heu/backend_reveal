import { ProfileInfoDTO } from '@/modules/users/services/authProviders/models/profileInfoDTO';

export abstract class AuthProvider {
  abstract getProfileInfo: (...args: any[]) => Promise<ProfileInfoDTO>;
  abstract checkValidAuthToken: (...args: any[]) => Promise<boolean>;
}
