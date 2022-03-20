import prisma from 'src/database';
import NoUsersFoundException from 'src/modules/user/errors/NoUsersFoundException';
import UserExistsException from 'src/modules/user/errors/UserExistsException';

export const userExists = async (email?: string) => {
  const data = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (data) throw new UserExistsException();
};

export const userNotFound = async (data: any) => {
  if (data instanceof Array) {
    if (data.length === 0) throw new NoUsersFoundException();
  }
  if (!data) throw new NoUsersFoundException();
};
