const {
  createProfileQuery,
  updateProfileQuery,
  getProfileQuery,
} = require("../queries/profileQueries");

const createProfile = async (req, res) => {
  try {
    const profile = await createProfileQuery(req.body);
    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ error: "Create Profile Failed" });
  }
};

const updateProfile = async (req, res) => {
  try {
    console.log("test");
    const profile = await updateProfileQuery(
      req.params.id,
      req.body.image,
      req.body.bio,
      req.body.links
    );
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ error: "Update Profile Failed" });
  }
};

const getProfile = async (req, res) => {
  try {
    const profile = await getProfileQuery(req.params.id);
    res.status(200).json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve profile" });
  }
};

module.exports = {
  createProfile,
  updateProfile,
  getProfile,
};
