import { ValueObject } from '@/shared/domain/valueObject';

interface UserNameProps {
  name: string;
}

export class UserName extends ValueObject<UserNameProps> {
  public static maxLength = 15;

  public static minLength = 2;

  get value(): string {
    return this.props.name;
  }

  private constructor(props: UserNameProps) {
    super(props);
  }

  public static create(props: UserNameProps): UserName {
    if (!props.name) {
      throw new Error('Must provide a name for the user');
    }

    if (props.name.length >= this.maxLength) {
      throw new Error('User must be greater than 2 chars and less than 100.');
    }

    if (props.name.length <= this.minLength) {
      throw new Error('User must be greater than 2 chars and less than 100.');
    }

    return new UserName(props);
  }
}
