const prisma = require('../db');
const bcrypt = require('bcryptjs');

const login = async (email, password) => {
  // Find user
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    throw new Error('Invalid credentials');
  }

  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  // Return user info (JWT will be added here in the future)
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    message: "Login successful (JWT omitted for now)"
  };
};

module.exports = {
  login
};
