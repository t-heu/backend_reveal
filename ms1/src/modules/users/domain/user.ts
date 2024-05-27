import { UserName } from '@/modules/users/domain/userName';
import { UserEmail } from '@/modules/users/domain/userEmail';
import { UserPassword } from '@/modules/users/domain/userPassword';
import { UserPhoto } from '@/modules/users/domain/userPhoto';
import { userId } from '@/modules/users/domain/userId';
import { SendEmailVerifyEvent } from '@/modules/users/domain/events/sendEmailVerifyEvent';
import { SendEmailForgotPasswordEvent } from '@/modules/users/domain/events/sendEmailForgotPasswordEvent';
import { JWTToken, RefreshToken } from '@/modules/users/domain/jwt';
import { UniqueEntityID } from '@/shared/domain/uniqueEntityID';
import { AggregateRoot } from '@/shared/domain/aggregateRoot';
import { DomainEvents } from '@/shared/domain/events/domainEvents';

interface UserProps {
  email: UserEmail;
  name: UserName;
  password: UserPassword;
  photo: UserPhoto;
  isEmailVerified?: boolean;
  accessToken?: JWTToken;
  refreshToken?: RefreshToken;
  lastLogin?: Date;
  avatarUrl?: string;
  has_google?: boolean;
  generateToken?: string;
}

export class User extends AggregateRoot<UserProps> {
  get userId(): userId {
    return userId.create(this._id);
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get name(): UserName {
    return this.props.name;
  }

  get email(): UserEmail {
    return this.props.email;
  }

  get password(): UserPassword {
    return this.props.password;
  }

  get photo(): UserPhoto {
    return this.props.photo;
  }

  get has_google(): boolean {
    return this.props.has_google || false;
  }

  get isEmailVerified(): boolean {
    return this.props.isEmailVerified || false;
  }

  get accessToken(): string {
    return this.props.accessToken || '';
  }

  get refreshToken(): string {
    return this.props.refreshToken || '';
  }

  get lastLogin(): Date {
    return this.props.lastLogin || new Date();
  }

  get profilePicture(): string {
    return this.props.photo.value;
  }

  get avatarUrl(): string {
    return this.props.photo.getUrl;
  }

  get generateToken(): string {
    return this.props.generateToken || '';
  }

  private constructor(props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public setAcessToken(
    accessToken: JWTToken,
    refreshToken: RefreshToken,
  ): void {
    this.props.accessToken = accessToken;
    this.props.refreshToken = refreshToken;
    this.props.lastLogin = new Date();
  }

  public static forgotPass(user: User): void {
    user.addDomainEvent(new SendEmailForgotPasswordEvent(user));
    DomainEvents.dispatchEventsForAggregate(user.id);
  }

  public static create(props: UserProps, id?: UniqueEntityID): User {
    const user = new User({ ...props }, id);

    if (!id) user.addDomainEvent(new SendEmailVerifyEvent(user));

    return user;
  }
}
