import { inject, injectable } from 'tsyringe';

import { IUseCase } from '../../../../shared/domain/UseCase';
import { IUserRepository } from '../../repos/IUserRepo';
import { UpdateUserAvatarDTO } from './UpdateUserAvatarDTO';

@injectable()
class UpdateUserAvatarUseCase implements IUseCase<UpdateUserAvatarDTO, string | void> {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ id, photo }: UpdateUserAvatarDTO): Promise<string | void> {
    const userInfo = await this.userRepository.findById(id);

    if (typeof userInfo === 'string') {
      return userInfo;
    }

    if (
      userInfo.profilePicture.match(/(https|http?:\/\/[^\s]+)/g) ||
      userInfo.profilePicture === 'no_photo.jpg'
    ) {
      await this.userRepository.save({
        id: userInfo.id.toValue() as string,
        data: {
          photo,
        },
      });
    }
  }
}

export default UpdateUserAvatarUseCase;
