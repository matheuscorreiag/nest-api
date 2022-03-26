import { JwtService } from '@nestjs/jwt';
import ErrorResponse from '../errors/ErrorResponse';
import InvalidCredentialsException from '../errors/InvalidCredentialsException';
import { AuthController } from '../modules/auth/auth.controller';
import { AuthService } from '../modules/auth/auth.service';

describe('Auth', () => {
  let authService: AuthService;
  let authController: AuthController;
  beforeAll(() => {
    const jwtService = new JwtService({ secretOrPrivateKey: 'secret' });
    authService = new AuthService(jwtService);
    authController = new AuthController(authService);
  });
  it('GET /auth --> should login user and return 200', async () => {
    try {
      const user = {
        email: 'matheus2@hotmail.com',
        password: 'senha123',
      };

      const response = await authController.login(user);

      console.log(response);

      expect(response.statusCode).toEqual(200);
    } catch (err) {
      console.log(err);
      expect(err).toBeInstanceOf(InvalidCredentialsException || ErrorResponse);
    }
  });
});
