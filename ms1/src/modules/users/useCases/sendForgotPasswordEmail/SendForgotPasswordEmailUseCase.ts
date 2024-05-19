import { inject, injectable } from 'tsyringe';
import { v4 as uuidv4 } from 'uuid';

import { IUseCase } from '../../../../shared/domain/UseCase';
import { IUserRepository } from '../../repos/IUserRepo';
import { ITokensRepository } from '../../repos/ITokensRepo';
import { SendForgotPasswordEmailDTO } from './SendForgotPasswordEmailDTO';
import { UserEmail } from '../../domain/userEmail';
import { serviceNoti } from '../../infra/rabbitmq';

@injectable()
class SendForgotPasswordEmailUseCase
  implements IUseCase<SendForgotPasswordEmailDTO, void>
{
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('TokensRepository')
    private tokensRepository: ITokensRepository,
  ) {}

  public async execute(data: SendForgotPasswordEmailDTO): Promise<void> {
    const generateToken = uuidv4();
    const email = UserEmail.create(data.email);

    const user = await this.userRepository.findUserByEmail(email);

    await this.tokensRepository.create({
      user_id: String(user.id.toValue()),
      token: generateToken,
      type: 'forgot_password',
    });

    await serviceNoti(
      {
        subject: 'Reveal Forgot Password',
        to: {
          email: user.email.value,
          name: user.name.value,
        },
        type: 'forgot_password',
        token: generateToken,
      },
      'sendEmailRegistrations',
    );
  }
}

export default SendForgotPasswordEmailUseCase;
