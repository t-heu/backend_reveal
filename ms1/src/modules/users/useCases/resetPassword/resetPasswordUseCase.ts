import { inject, injectable } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';

import { IUseCase } from '@/shared/domain/useCase';
import { IUserRepository } from '@/modules/users/domain/repos/IUserRepo';
import { ITokensRepository } from '@/modules/users/domain/repos/ITokensRepo';
import { UserPassword } from '@/modules/users/domain/userPassword';
import { ResetPasswordDTO } from '@/modules/users/useCases/resetPassword/resetPasswordDTO';

@injectable()
class ResetPasswordUseCase implements IUseCase<ResetPasswordDTO, void> {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('TokensRepository')
    private tokensRepository: ITokensRepository,
  ) {}

  public async execute(data: ResetPasswordDTO): Promise<void> {
    const password = UserPassword.create({ value: data.password });

    const userToken = await this.tokensRepository.findByToken(data.token);

    const user = await this.userRepository.findById(userToken.user_id);

    if (userToken.is_revoked) {
      throw new Error('Token already used.');
    }

    const tokenCreatedAt = userToken.createdAt;
    const compareDate = addHours(tokenCreatedAt, 1);

    if (isAfter(Date.now(), compareDate)) {
      throw new Error('Token expired.');
    }

    await this.userRepository.save({
      id: String(user.id.toValue()),
      data: {
        password: await password.getHashedValue(),
      },
    });

    await this.tokensRepository.save({ id: userToken.id, is_revoked: 1 });
  }
}

export default ResetPasswordUseCase;
