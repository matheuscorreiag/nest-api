import NoDataFoundException from '../errors/NoDataFoundException';
import { Role } from '../modules/auth/role/role.enum';
import { UserController } from '../modules/user/user.controller';
import { UserService } from '../modules/user/user.service';

describe('Users', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
    userController = new UserController(userService);
  });

  // it('GET /users --> should return array of users', async () => {
  //   const data = await userController.getUser();
  //   expect(data.data).toEqual(
  //     expect.arrayContaining([
  //       expect.objectContaining({
  //         id: expect.any(String),
  //         name: expect.any(String),
  //         email: expect.any(String),
  //         role: expect.any(String),
  //         createdAt: expect.any(Date),
  //         updatedAt: expect.any(Date),
  //       }),
  //     ]),
  //   );
  //   expect(data.statusCode).toBe(200);
  // });

  // it('POST /users --> should create one user', async () => {
  //   const data = await userController.create({
  //     email: 'matheus@hotmail.com',
  //     name: 'Matheus',
  //     password: '123',
  //     role: Role.ADMIN,
  //   });
  //   expect(data.statusCode).toEqual(200);
  // });
  it('GET /users/:id --> should return one user', async () => {
    try {
      const data = await userController.findOne('cl165ytfm00047cu6xdctw1dk');
      expect(data.data).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
          email: expect.any(String),
          role: expect.any(String),
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
      );
      expect(data.statusCode).toBe(200);
    } catch (err) {
      expect(err).toBeInstanceOf(NoDataFoundException);
    }
  });

  // it('PUT /users/update --> should update one user, return 200', async () => {
  //   const data = await userController.update('cl1657rs80002owu6khhusog3', {
  //     email: 'matheus2@hotmail.com',
  //     name: 'Matheus2',
  //   });
  //   expect(data.statusCode).toEqual(200);
  // });

  // it('DELETE /users/delete --> should delete one user, return 200', async () => {
  //   const data = await userController.delete('cl1657rs80002owu6khhusog3');
  //   expect(data.statusCode).toEqual(200);
  // });
});
