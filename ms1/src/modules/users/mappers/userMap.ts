import { Mapper } from '@/shared/infra/mapper';
import { User } from '@/modules/users/domain/user';
import { UserDTO } from '@/modules/users/dtos/UserDTO';
import { UniqueEntityID } from '@/shared/domain/uniqueEntityID';
import { UserName } from '@/modules/users/domain/userName';
import { UserPassword } from '@/modules/users/domain/userPassword';
import { UserEmail } from '@/modules/users/domain/userEmail';
import { UserPhoto } from '@/modules/users/domain/userPhoto';

class UserMap implements Mapper<User> {
  public toDTO(t: User): UserDTO {
    return {
      id: t.id.toString(),
      name: t.name.value,
      isEmailVerified: t.isEmailVerified,
      email: t.email.value,
      profilePicture: t.profilePicture,
      has_google: t.has_google,
      avatar_url: t.avatarUrl,
    };
  }

  public toDomain(raw: any): User {
    const userNameOrError = UserName.create({ name: raw.name });
    const userPasswordOrError = UserPassword.create({
      value: raw.password,
      hashed: true,
    });
    const userEmailOrError = UserEmail.create(raw.email);
    const userPhotoOrError = UserPhoto.create(raw.photo);

    const userOrError = User.create(
      {
        name: userNameOrError,
        isEmailVerified: raw.enabled,
        password: userPasswordOrError,
        email: userEmailOrError,
        photo: userPhotoOrError,
        has_google:
          raw.external_auths.filter(
            (google: any) => google.providerName === 'Google',
          ).length > 0,
      },
      new UniqueEntityID(raw.id),
    );

    return userOrError;
  }

  public async toPersistence(t: User): Promise<any> {
    let password = '';

    if (!!t.password === true) {
      if (t.password.isAlreadyHashed()) {
        password = t.password.value;
      } else {
        password = await t.password.getHashedValue();
      }
    }

    return {
      photo: t.profilePicture,
      id: t.userId.id.toString(),
      name: t.name.value,
      email: t.email.value,
      createdAt: new Date(),
      password,
      enabled: t.isEmailVerified,
    };
  }
}

export default new UserMap();
