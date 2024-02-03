import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, saltOrRounds);
};

type ComparePassword = {
  enteredPassword: string;
  hashedPassword: string;
};

export const comparePassword = async ({
  enteredPassword,
  hashedPassword,
}: ComparePassword) => {
  return await bcrypt.compare(enteredPassword, hashedPassword);
};
