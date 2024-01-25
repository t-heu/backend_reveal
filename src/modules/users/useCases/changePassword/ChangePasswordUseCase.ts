import { inject, injectable } from 'tsyringe';

import { IUseCase } from '../../../../shared/domain/UseCase';
import { IUserRepository } from '../../repos/IUserRepo';
import { ChangePasswordDTO } from './ChangePasswordDTO';
import { UserPassword } from '../../domain/userPassword';

@injectable()
class ChangePasswordUseCase implements IUseCase<ChangePasswordDTO, string | void> {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute(data: ChangePasswordDTO): Promise<string | void> {
    const existUser = await this.userRepository.findById(data.id);

    if (typeof existUser === 'string') {
      return existUser;
    }

    if (data.newPassword && !data.oldPassword) {
      return 'You need to inform the old password to set a new password.';
    }

    if (data.newPassword && data.oldPassword) {
      const currentPassword = UserPassword.create({
        value: data.newPassword,
        hashed: false,
      });
      const oldPassword = UserPassword.create({
        value: data.oldPassword,
        hashed: true,
      });

      if (typeof oldPassword === 'string') {
        return oldPassword;
      }
  
      if (typeof currentPassword === 'string') {
        return currentPassword;
      }

      if (!(await oldPassword.comparePassword(existUser.password.value))) {
        return 'Old password does not match.';
      }

      if (await currentPassword.comparePassword(existUser.password.value)) {
        return 'Equal passwords.';
      }

      await this.userRepository.save({
        id: data.id,
        data: {
          password: await currentPassword.getHashedValue(),
        },
      });
    }
  }
}

export default ChangePasswordUseCase;
