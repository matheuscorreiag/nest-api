import { PostController } from '../modules/post/post.controller';
import { PostService } from '../modules/post/post.service';

describe('Posts', () => {
  let postController: PostController;
  let postService: PostService;

  beforeEach(() => {
    postService = new PostService();
    postController = new PostController(postService);
  });

  it('GET /post --> should return array of post', async () => {
    const data = await postController.findAll();
    expect(data.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          description: expect.any(String),
          name: expect.any(String),
          userId: expect.any(String),
        }),
      ]),
    );
    expect(data.statusCode).toBe(200);
  });

  //   const user = {
  //     id: '1',
  //     name: 'Matheus',
  //     role: 'admin',
  //   };
  //   it('POST /post --> should create one user', async () => {
  //     const data = await postController.create(
  //       {
  //         description: 'description',
  //         name: 'name',
  //       },
  //       user,
  //     );
  //     expect(data.statusCode).toEqual(400);
  //   });

  //   it('GET /post/:id --> should return one post', async () => {
  //     const data = await postController.findAllByUser('1');
  //     // expect(data.data).toEqual(
  //     //   expect.objectContaining({
  //     //     id: expect.any(String),
  //     //     name: expect.any(String),
  //     //     email: expect.any(String),
  //     //     role: expect.any(String),
  //     //     createdAt: expect.any(Date),
  //     //     updatedAt: expect.any(Date),
  //     //   }),
  //     // );
  //     expect(data.statusCode).toBe(404);
  //   });

  //   it('PUT /post/update --> should update one user, return 200', async () => {
  //     const data = await userController.update('cl1657rs80002owu6khhusog3', {
  //       email: 'matheus2@hotmail.com',
  //       name: 'Matheus2',
  //     });
  //     expect(data.statusCode).toEqual(200);
  //   });

  //   it('DELETE /post/delete --> should delete one user, return 200', async () => {
  //     const data = await userController.delete('cl1657rs80002owu6khhusog3');
  //     expect(data.statusCode).toEqual(200);
  //   });
});
