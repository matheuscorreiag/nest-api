export interface IAuthUser {
  id: string;
  name: string;
  role: string;
}

export interface PrismaCatchError {
  meta: {
    cause: string;
  };
}
