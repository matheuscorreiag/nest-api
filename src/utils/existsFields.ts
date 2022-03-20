import prisma from 'src/database';
import NoDataFoundException from 'src/errors/NoDataFoundException';
import UserExistsException from 'src/modules/user/errors/UserExistsException';

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
