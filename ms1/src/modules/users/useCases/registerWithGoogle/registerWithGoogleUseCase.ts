import { inject, injectable } from 'tsyringe';

import { IUseCase } from '../../../../shared/domain/useCase';
import { IUserRepository } from '../../repos/IUserRepo';
import { IExternalAuthRepository } from '../../repos/IExternalAuthRepo';
import { RegisterWithGoogleDTO, ResponseDTO } from './registerWithGoogleDTO';
import { User } from '../../domain/user';
import { UserEmail } from '../../domain/userEmail';
import { UserName } from '../../domain/userName';
import { UserPhoto } from '../../domain/userPhoto';
import { UserPassword } from '../../domain/userPassword';
import { googleService } from '../../services/authProviders';
import { RefreshToken, Jwt, JWTToken } from '../../domain/jwt';

@injectable()
class RegisterWithGoogleUseCase
  implements IUseCase<RegisterWithGoogleDTO, ResponseDTO> {
  constructor(
    @inject('ExternalAuthRepository')
    private externalAuthRepository: IExternalAuthRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute(data: RegisterWithGoogleDTO): Promise<ResponseDTO> {
    const user: ResponseDTO = {} as ResponseDTO;

    // faz verificação do Auth token
    if (!(await googleService.checkValidAuthToken(data.accessTokenGoogle))) {
      throw new Error('Google token invalid');
    }

    const googleProfileInfo = await googleService.getProfileInfo();

    const userEmail = UserEmail.create(googleProfileInfo.userEmail);

    const alreadyCreatedUser = await this.userRepository.exists(userEmail);

    // se não exitir nenhuma conta Social ou Local ele cria uma conta via login Social
    if (!alreadyCreatedUser) {
      const name = UserName.create({ name: googleProfileInfo.fullName });
      const password = UserPassword.create({
        value: '',
        provider_social: true,
      });

      const userResponse = User.create({
        name,
        isEmailVerified: googleProfileInfo.verified_email,
        email: userEmail,
        photo: UserPhoto.create(googleProfileInfo.profilePictureUrl),
        password,
      });

      await this.userRepository.create(userResponse);
      user.user = userResponse;

      await this.externalAuthRepository.findLoginSocialOrCreate({
        providerUserId: String(googleProfileInfo.userId),
        providerName: 'Google',
        userId: userResponse.id.toValue() as string,
      });

      const refreshToken: RefreshToken = Jwt.generateRefreshToken();
      const accessToken: JWTToken = Jwt.generateAccessToken({
        userId: userResponse.id.toValue().toString(),
      });
      userResponse.setAcessToken(accessToken, refreshToken);
    } else {
      // se existir uma conta local e não social.
      const alreadyUser = await this.userRepository.findUserByEmail(userEmail);
      if (typeof alreadyUser === 'string') {
        return alreadyUser;
      }
      user.user = alreadyUser;

      await this.externalAuthRepository.findLoginSocialOrCreate({
        providerUserId: String(googleProfileInfo.userId),
        providerName: 'Google',
        userId: String(alreadyUser.id.toValue()),
      });

      const refreshToken: RefreshToken = Jwt.generateRefreshToken();
      const accessToken: JWTToken = Jwt.generateAccessToken({
        userId: alreadyUser.id.toValue().toString(),
      });
      alreadyUser.setAcessToken(accessToken, refreshToken);
    }

    return {
      user: user.user,
      accessToken: user.accessToken,
    };
  }
}

export default RegisterWithGoogleUseCase;
