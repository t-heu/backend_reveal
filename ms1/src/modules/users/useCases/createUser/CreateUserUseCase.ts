import { inject, injectable } from 'tsyringe';

import { v4 as uuidv4 } from 'uuid';

import { IUseCase } from '../../../../shared/domain/UseCase';
import { IUserRepository } from '../../repos/IUserRepo';
import { CreateUserDTO } from './CreateUserDTO';
import { User } from '../../domain/user';
import { UserName } from '../../domain/userName';
import { UserEmail } from '../../domain/userEmail';
import { UserPhoto } from '../../domain/userPhoto';
import { UserPassword } from '../../domain/userPassword';
import { ITokensRepository } from '../../repos/ITokensRepo';

import { UploadStorage } from '../../../../config/upload';

@injectable()
class CreateUserUseCase implements IUseCase<CreateUserDTO, void> {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('TokensRepository')
    private tokensRepository: ITokensRepository,
  ) {}

  public async execute(data: CreateUserDTO): Promise<void> {
    const name = UserName.create({ name: data.name });
    const email = UserEmail.create(data.email);
    const password = UserPassword.create({ value: data.password });
    const photo = UserPhoto.create(new UploadStorage().storage());
    const generateToken = uuidv4();

    const user = User.create({ name, email, password, photo, generateToken });

    if (await this.userRepository.exists(email)) {
      throw new Error(`
        The email ${email.value} associated for this account already exists
      `);
    }

    await this.userRepository.create(user);

    await this.tokensRepository.create({
      user_id: String(user.id.toValue()),
      token: generateToken,
      type: 'verified_email',
    });
  }
}

export default CreateUserUseCase;
