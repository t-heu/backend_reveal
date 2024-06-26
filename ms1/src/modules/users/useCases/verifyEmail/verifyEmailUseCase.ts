import { inject, injectable } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';

import { IUseCase } from '@/shared/domain/useCase';
import { IUserRepository } from '@/modules/users/domain/repos/IUserRepo';
import { ITokensRepository } from '@/modules/users/domain/repos/ITokensRepo';
import { VerifyEmailDTO } from '@/modules/users/useCases/verifyEmail/verifyEmailDTO';

@injectable()
class VerifyEmailUseCase implements IUseCase<VerifyEmailDTO, void> {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('TokensRepository')
    private tokensRepository: ITokensRepository,
  ) {}

  public async execute(data: VerifyEmailDTO): Promise<void> {
    const userToken = await this.tokensRepository.findByToken(data.token);

    const user = await this.userRepository.findById(userToken.user_id);

    if (user.isEmailVerified) {
      throw new Error('Email already Verified.');
    }

    if (userToken.is_revoked) {
      throw new Error('Token already used.');
    }

    const tokenCreatedAt = userToken.createdAt;
    const compareDate = addHours(tokenCreatedAt, 1);

    if (isAfter(Date.now(), compareDate)) {
      throw new Error('Token expired.');
    }

    await this.userRepository.save({
      id: user.id.toString(),
      data: {
        enabled: true,
      },
    });

    await this.tokensRepository.save({ id: userToken.id, is_revoked: 1 });
  }
}

export default VerifyEmailUseCase;
