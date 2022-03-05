import { IPost } from '../post/post.interface';

export interface IUser {
  id?: string;
  name: string;
  email: string;
  post: IPost[];
  password?: string;
}
