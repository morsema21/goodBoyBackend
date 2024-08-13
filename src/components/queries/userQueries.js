const { bcrypt, prisma, jwt } = require("../../shared");

const registerQuery = async ({
  email,
  username,
  password,
  name,
  isAdmin,
  posts,
}) => {
  const hashPassword = await bcrypt.hash(password, 10);
  const registerUser = await prisma.user.create({
    data: {
      email,
      username,
      password: hashPassword,
      name,
      isAdmin,
    },
    include: {
      posts,
    },
  });
  const token = jwt.sign(
    {
      id: registerUser.id,
      isAdmin: registerUser.isAdmin,
      posts: registerUser.posts,
    },
    process.env.WEB_TOKEN
  );
  console.log(registerUser, "test");
  const updatedToken = {
    token,
    id: registerUser.id,
    posts: registerUser.posts,
  };
  return updatedToken;
};

const loginUser = async (username, password) => {
  console.log("Login:", username, password);
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
    include: {
      posts: true,
    },
  });
  console.log("user:", user);

  if (!user) {
    throw new Error("No user found.");
  }
  const passwordValid = await bcrypt.compare(password, user.password);

  if (!passwordValid) {
    throw new Error("Invalid credentials");
  }
  const token = jwt.sign(
    {
      id: user.id,
      isAdmin: user.isAdmin,
      posts: user.posts,
    },

    process.env.WEB_TOKEN
  );
  const updatedToken = {
    token,
    id: user.id,
    posts: user.posts,
    isAdmin: user.isAdmin,
  };
  return updatedToken;
};

const getAllUsers = async () => {
  return await prisma.user.findMany();
};

const deleteUserById = async (id) => {
  console.log(`Attempting to delete user with id: ${id}`);
  return await prisma.user.delete({
    where: {
      id,
    },
  });
};

const updateUserById = async (id, email, username, password, name, isAdmin) => {
  const hashPassword = await bcrypt.hash(password, 10);
  return await prisma.user.update({
    where: { id },
    data: {
      email,
      username,
      password: hashPassword,
      name,
      isAdmin,
    },
  });
};

const promoteUserById = async (
  id,
  email,
  username,
  password,
  name,
  isAdmin
) => {
  const hashPassword = await bcrypt.hash(password, 10);
  return await prisma.user.update({
    where: { id },
    data: {
      email,
      username,
      password: hashPassword,
      name,
      isAdmin,
    },
  });
};

const getSingleUser = async (id) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
};

module.exports = {
  registerQuery,
  loginUser,
  getAllUsers,
  deleteUserById,
  updateUserById,
  getSingleUser,
  promoteUserById,
};
