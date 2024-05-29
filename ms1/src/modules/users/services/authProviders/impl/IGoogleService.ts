import { AuthProvider } from '@/modules/users/services/authProviders/models/authProvider';
import { ProfileInfoDTO } from '@/modules/users/services/authProviders/models/profileInfoDTO';

/**
 * Interface para o serviço Google de autenticação.
 */
export interface IGoogleService extends AuthProvider {
  getProfileInfo(): Promise<ProfileInfoDTO>;
  checkValidAuthToken(token: string): Promise<boolean>;
}
