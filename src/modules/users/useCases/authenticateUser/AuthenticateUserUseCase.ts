import { inject, injectable } from 'tsyringe';

import { IUseCase } from '../../../../shared/domain/UseCase';
import { IUserRepository } from '../../repos/IUserRepo';
import { ITokensRepository } from '../../repos/ITokensRepo';
import { AuthenticateUserDTO, ResponseDTO } from './AuthenticateUserDTO';
import { UserEmail } from '../../domain/userEmail';
import { UserPassword } from '../../domain/userPassword';
import { RefreshToken, Jwt, JWTToken } from '../../domain/jwt';

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
      userId: user.id.toValue().toString(),
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
