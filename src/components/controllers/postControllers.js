const {
  createPostQuery,
  getSinglePost,
  getAllPosts,
  updatePostQuery,
  deletePostQuery,
} = require("../queries/postQueries");

const createPost = async (req, res) => {
  try {
    const post = await createPostQuery(req.body);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: "Failed to create post" });
  }
};

const singlePost = async (req, res) => {
  try {
    const post = await getSinglePost(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve post" });
  }
};

const getAll = async (req, res) => {
  try {
    const post = await getAllPosts();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve posts" });
  }
};

const updatePost = async (req, res) => {
  try {
    const post = await updatePostQuery(
      req.params.id,
      req.body.updateAt,
      req.body.title,
      req.body.content,
      req.body.published
    );
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: "Failed to update post" });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await deletePostQuery(req.params.id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete post" });
  }
};

module.exports = {
  createPost,
  singlePost,
  getAll,
  updatePost,
  deletePost,
};
