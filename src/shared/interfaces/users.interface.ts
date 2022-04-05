export interface IAuthUser {
  id: string;
  name: string;
  role: string;
}
export interface NestRequest extends Request {
  user?: IAuthUser;
}
