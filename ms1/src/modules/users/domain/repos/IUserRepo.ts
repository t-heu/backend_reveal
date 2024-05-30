import { User } from '@/modules/users/domain/user';
import { UserEmail } from '@/modules/users/domain/userEmail';

interface DataDTO {
  password?: string;
  photo?: string;
  name?: string;
  enabled?: boolean;
  locale?: string;
  notification_key?: string;
}

export interface EditDTO {
  id: string;
  data: DataDTO;
}

export interface IUserRepository {
  create(data: User): Promise<void>;
  findById(id: string): Promise<User>;
  save(data: EditDTO): Promise<void>;
  findUserByEmail(data: UserEmail): Promise<User>;
  exists(data: UserEmail): Promise<boolean>;
}
