import { inject, injectable } from 'tsyringe';

import { IUseCase } from '@/shared/domain/useCase';
import { IUserRepository } from '@/modules/users/domain/repos/IUserRepo';
import { UpdateUserAvatarDTO } from '@/modules/users/useCases/updateUserAvatar/updateUserAvatarDTO';

@injectable()
class UpdateUserAvatarUseCase implements IUseCase<UpdateUserAvatarDTO, void> {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ id, photo }: UpdateUserAvatarDTO): Promise<void> {
    const userInfo = await this.userRepository.findById(id);

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
