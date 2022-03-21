import prisma from '../database';
import NoDataFoundException from '../errors/NoDataFoundException';
import UserExistsException from '../modules/user/errors/UserExistsException';

export const userExists = async (email?: string) => {
  const data = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (data) throw new UserExistsException();
};

export const isDataFound = async (data: any) => {
  if (data instanceof Array) {
    if (data.length === 0) throw new NoDataFoundException();
  }
  if (!data) throw new NoDataFoundException();
};
