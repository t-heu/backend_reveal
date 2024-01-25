import { inject, injectable } from 'tsyringe';

import { IUseCase } from '../../../../shared/domain/UseCase';
import { IUserRepository } from '../../repos/IUserRepo';
import { CreateUserDTO } from './CreateUserDTO';
import { User } from '../../domain/user';
import { UserName } from '../../domain/userName';
import { UserEmail } from '../../domain/userEmail';
import { UserPhoto } from '../../domain/userPhoto';
import { UserPassword } from '../../domain/userPassword';

import { UploadStorage } from '../../../../config/upload';

@injectable()
class CreateUserUseCase implements IUseCase<CreateUserDTO, string | void> {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute(data: CreateUserDTO): Promise<string | void> {
    const name = UserName.create({ name: data.name });
    const email = UserEmail.create(data.email);
    const password = UserPassword.create({ value: data.password });
    const photo = UserPhoto.create(new UploadStorage().storage());

    if (typeof name === 'string') {
      return name;
    }

    if (typeof email === 'string') {
      return email;
    }

    if (typeof password === 'string') {
      return password;
    }

    const user = User.create({ name, email, password, photo });

    if (await this.userRepository.exists(email)) {
      return `The email ${email.value} associated for this account already exists`;
    }

    await this.userRepository.create(user);
  }
}

export default CreateUserUseCase;
