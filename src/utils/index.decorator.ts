import { createParamDecorator } from '@nestjs/common';

export const AuthUser = createParamDecorator((data, req): Promise<any> => {
  console.log(req.user);
  return req.user;
});
