import { AuthProviderProfileInfo } from '@/modules/users/services/authProviders/models/authProviderProfileInfo';

export abstract class AuthProvider {
  abstract getProfileInfo: (...args: any[]) => Promise<AuthProviderProfileInfo>;

  abstract checkValidAuthToken: (...args: any[]) => Promise<boolean>;
}
