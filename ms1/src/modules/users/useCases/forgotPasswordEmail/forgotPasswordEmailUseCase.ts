import { inject, injectable } from 'tsyringe';
import { v4 as uuidv4 } from 'uuid';

import { IUseCase } from '../../../../shared/domain/useCase';
import { IUserRepository } from '../../repos/IUserRepo';
import { ITokensRepository } from '../../repos/ITokensRepo';
import { ForgotPasswordEmailDTO } from './forgotPasswordEmailDTO';
import { UserEmail } from '../../domain/userEmail';
import { User } from '../../domain/user';

@injectable()
class ForgotPasswordEmailUseCase
  implements IUseCase<ForgotPasswordEmailDTO, void>
{
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('TokensRepository')
    private tokensRepository: ITokensRepository,
  ) {}

  public async execute(data: ForgotPasswordEmailDTO): Promise<void> {
    const generateToken = uuidv4();
    const email = UserEmail.create(data.email);

    const user = await this.userRepository.findUserByEmail(email);

    await this.tokensRepository.create({
      user_id: String(user.id.toValue()),
      token: generateToken,
      type: 'forgot_password',
    });

    user.props.generateToken = generateToken;
    User.forgotPass(user);
  }
}

export default ForgotPasswordEmailUseCase;
