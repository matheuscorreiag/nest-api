import { IUser } from '../user/user.interface';

export interface IPost {
  id?: string;
  title: string;
  description: string;
  user: IUser;
  userId: string;
}
