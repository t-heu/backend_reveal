import { inject, injectable } from 'tsyringe';

import { IUseCase } from '@/shared/domain/useCase';
import { IUserRepository } from '@/modules/users/domain/repos/IUserRepo';
import { ITokensRepository } from '@/modules/users/domain/repos/ITokensRepo';
import { AuthenticateUserDTO, ResponseDTO } from '@/modules/users/useCases/authenticateUser/authenticateUserDTO';
import { UserEmail } from '@/modules/users/domain/userEmail';
import { UserPassword } from '@/modules/users/domain/userPassword';
import { RefreshToken, Jwt, JWTToken } from '@/modules/users/domain/jwt';

@injectable()
class AuthenticateUserUseCase
  implements IUseCase<AuthenticateUserDTO, ResponseDTO> {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('TokensRepository')
    private tokensRepository: ITokensRepository,
  ) {}

  public async execute(data: AuthenticateUserDTO): Promise<ResponseDTO> {
    const email = UserEmail.create(data.email);
    const password = UserPassword.create({
      value: data.password,
      hashed: true,
    });

    const user = await this.userRepository.findUserByEmail(email);
  
    if (!user.isEmailVerified) {
      throw new Error('Confirm your email to be able to login');
    }

    if (!(await password.comparePassword(user.password.value))) {
      throw new Error('invalid password');
    }

    const refresh_token: RefreshToken = Jwt.generateRefreshToken();
    const access_token: JWTToken = Jwt.generateAccessToken({
      userID: user.id.toValue().toString(),
    });

    await this.tokensRepository.is_revogedAll(user.id.toString());

    await this.tokensRepository.create({
      user_id: user.id.toString(),
      token: refresh_token,
      type: 'refresh_token',
    });

    user.setAcessToken(access_token, refresh_token);

    return {
      user,
      access_token,
      refresh_token,
      token_type: 'bearer',
      expires: 300,
    };
  }
}

export default AuthenticateUserUseCase;
