import { ValueObject } from '../../../shared/domain/ValueObject';

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

  public static create(props: UserNameProps): string | UserName {
    if (!props.name) {
      return 'Must provide a name for the user';
    }

    if (props.name.length >= this.maxLength) {
      return 'User must be greater than 2 chars and less than 100.';
    }

    if (props.name.length <= this.minLength) {
      return 'User must be greater than 2 chars and less than 100.';
    }

    return new UserName(props);
  }
}
