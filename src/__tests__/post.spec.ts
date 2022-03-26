import ErrorResponse from '../errors/ErrorResponse';
import NoDataFoundException from '../errors/NoDataFoundException';
import { PostController } from '../modules/post/post.controller';
import { PostService } from '../modules/post/post.service';
import UserNotFoundException from '../modules/user/errors/UserNotFoundException';

describe('Posts', () => {
  let postController: PostController;
  let postService: PostService;

  beforeEach(() => {
    postService = new PostService();
    postController = new PostController(postService);
  });

  it('GET /post --> should return array of post', async () => {
    try {
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
    } catch (err) {
      expect(err).toBeInstanceOf(NoDataFoundException || ErrorResponse);
    }
  });

  const req = {
    user: {
      id: '1',
      name: 'Matheus',
      role: 'admin',
    },
  };
  it('POST /post --> should create one post', async () => {
    try {
      const data = await postController.create(
        {
          description: 'description',
          name: 'name',
        },
        req,
      );
      expect(data.statusCode).toEqual(200);
    } catch (err) {
      expect(err).toBeInstanceOf(UserNotFoundException || ErrorResponse);
    }
  });

  it('GET /post/:id --> should return all posts from user', async () => {
    try {
      const data = await postController.findAllByUser('1');
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
      expect(err).toBeInstanceOf(NoDataFoundException || ErrorResponse);
    }
  });

  it('PUT /post/update --> should update one post, return 200', async () => {
    try {
      const data = await postController.update('cl1657rs80002owu6khhusog3', {
        description: 'ABCDE',
        id: '1',
        name: 'abcde',
      });
      expect(data.statusCode).toEqual(200);
    } catch (err) {
      expect(err).toBeInstanceOf(UserNotFoundException || ErrorResponse);
    }
  });

  it('DELETE /post/delete --> should delete one post, return 200', async () => {
    try {
      const data = await postController.remove('cl1657rs80002owu6khhusog3');
      expect(data.statusCode).toEqual(200);
    } catch (err) {
      expect(err).toBeInstanceOf(UserNotFoundException || ErrorResponse);
    }
  });
});
