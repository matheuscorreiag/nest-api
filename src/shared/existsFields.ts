import prisma from '../database';
import NoDataFoundException from '../errors/NoDataFoundException';
import UserExistsException from '../modules/user/errors/UserExistsException';
import UserNotFoundException from '../modules/user/errors/UserNotFoundException';

export const userExists = async (email?: string) => {
  const data = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (data) throw new UserExistsException();
};

export const userExistsById = async (id?: string) => {
  const data = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  if (!data) throw new UserNotFoundException();
};

export const isDataFound = async (data: any) => {
  if (data instanceof Array) {
    if (data.length === 0) throw new NoDataFoundException();
  }
  if (!data) throw new NoDataFoundException();
};
