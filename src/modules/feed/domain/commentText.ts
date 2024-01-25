import { ValueObject } from '../../../shared/domain/ValueObject';

interface CommentTextProps {
  value: string;
}

export class CommentText extends ValueObject<CommentTextProps> {
  public static maxLength = 10000;

  public static minLength = 3;

  get value(): string {
    return this.props.value;
  }

  private constructor(props: CommentTextProps) {
    super(props);
  }

  public static create(props: CommentTextProps): string | CommentText {
    if (!props.value) {
      return 'Must provide a Comment for the user';
    }

    if (props.value.length >= this.maxLength) {
      return `Comment must be greater than ${this.maxLength} chars and less than 100.`;
    }

    if (props.value.length <= this.minLength) {
      return `Comment must be greater than ${this.minLength} chars and less than 100.`;
    }

    return new CommentText(props);
  }
}
