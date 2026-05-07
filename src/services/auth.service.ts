import prisma from '../db';
import bcrypt from 'bcryptjs';

export const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    message: "Login successful (JWT omitted for now)"
  };
};
