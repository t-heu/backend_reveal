export interface AuthProviderProfileInfo {
  fullName: string;
  firstName?: string;
  lastName?: string;
  verified_email?: boolean;
  profilePictureUrl: string;
  userID: number;
  userEmail: string;
}
