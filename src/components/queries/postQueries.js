const { prisma } = require("../../shared");

//create post
const createPostQuery = async ({
  createdAt,
  updatedAt,
  title,
  content,
  published,
  userId,
}) => {
  return await prisma.post.create({
    data: {
      createdAt,
      updatedAt,
      title,
      content,
      published,
      userId,
    },
  });
};
//get post
const getSinglePost = async (id) => {
  return await prisma.post.findUnique({
    where: { id },
  });
};
//get all
const getAllPosts = async () => {
  return await prisma.post.findMany();
};
//update
const updatePostQuery = async (id, updatedAt, title, content, published) => {
  return await prisma.post.update({
    where: { id },
    data: {
      updatedAt,
      title,
      content,
      published,
    },
  });
};
//delete
const deletePostQuery = async (id) => {
  return await prisma.post.delete({
    where: { id },
  });
};

module.exports = {
  createPostQuery,
  getSinglePost,
  getAllPosts,
  updatePostQuery,
  deletePostQuery,
};
