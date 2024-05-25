import { ValueObject } from '../../../shared/domain/valueObject';
import UploadConfig from '../../../config/upload';

export interface UserPhotoProps {
  value: string;
  getUrl?: string;
}

export class UserPhoto extends ValueObject<UserPhotoProps> {
  get value(): string {
    return this.props.value;
  }

  get getUrl(): string {
    return this.props.getUrl || '';
  }

  private constructor(props: UserPhotoProps) {
    super(props);
  }

  private static isPhotoUrl(photo: string) {
    const re = /(https|http?:\/\/[^\s]+)/g;
    return re.test(photo);
  }

  private static formatUrl(photo?: string): string {
    switch (UploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_URL}/files/${photo}?${Date.now()}`;
      case 'firebase_storage':
        return `https://firebasestorage.googleapis.com/v0/b/inspired-skill-159220.appspot.com/o/${photo}?alt=media&token=9ee34224-59f8-44b8-98af-ddf7dec9e239?${Date.now()}`;
      default:
        return `${process.env.APP_URL}/files/${photo}?${Date.now()}`;
    }
  }

  public static create(photo?: string): UserPhoto {
    const newPhoto = photo || 'no_photo.jpg';

    if (this.isPhotoUrl(newPhoto)) {
      return new UserPhoto({ value: newPhoto });
    }

    return new UserPhoto({
      value: newPhoto,
      getUrl: this.formatUrl(newPhoto),
    });
  }
}
