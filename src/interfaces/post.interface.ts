import { IUser } from './user.interface';

export interface IPost {
  id?: string;
  title: string;
  description: string;
  user: IUser;
  userId: string;
}
