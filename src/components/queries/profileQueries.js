const { prisma } = require("../../shared");

const createProfileQuery = async ({ image, bio, links, userId }) => {
  return await prisma.profile.create({
    data: {
      image,
      bio,
      links,
      userId,
    },
  });
};

const updateProfileQuery = async (id, image, bio, links) => {
  return await prisma.profile.update({
    where: { id },
    data: {
      image,
      bio,
      links,
    },
  });
};

const getProfileQuery = async (id) => {
  return await prisma.profile.findUnique({
    where: { id },
  });
};

module.exports = {
  createProfileQuery,
  updateProfileQuery,
  getProfileQuery,
};
