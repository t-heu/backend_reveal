import { User } from '../domain/user';
import { UserEmail } from '../domain/userEmail';

interface IData {
  password?: string;
  photo?: string;
  name?: string;
  enabled?: boolean;
  locale?: string;
  notification_key?: string;
}

export interface IEditDTO {
  id: string;
  data: IData;
}

export interface IUserRepository {
  create(data: User): Promise<void>;
  findById(id: string): Promise<string | User>;
  save(data: IEditDTO): Promise<void>;
  findUserByEmail(data: UserEmail): Promise<string | User>;
  exists(data: UserEmail): Promise<boolean>;
}
