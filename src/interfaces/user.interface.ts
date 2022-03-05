import { IPost } from './post.interface';

export interface IUser {
  id?: string;
  name: string;
  email: string;
  post: IPost[];
  password?: string;
}
