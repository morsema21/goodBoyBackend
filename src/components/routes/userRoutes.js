const { route } = require("../../shared");
const {
  register,
  login,
  getUsers,
  deleteUser,
  updateUser,
  getUserById,
  promoteUser,
} = require("../controllers/userControllers");
const {
  createProfile,
  updateProfile,
  getProfile,
} = require("../controllers/profileControllers");
const {
  createPost,
  singlePost,
  getAll,
  updatePost,
  deletePost,
} = require("../controllers/postControllers");

const { sendInquiry } = require("../email/email");

const { authenticateToken, isAdmin } = require("../middleware/authMiddleware");

route.post("/sendEmail", sendInquiry); //tested
//user routes
route.post("/register", register); //tested
route.post("/login", login); //tested
route.get("/users", authenticateToken, isAdmin, getUsers); //tested
route.get("/user/:id", authenticateToken, getUserById); //tested
route.delete("/deleteUser/:id", authenticateToken, deleteUser); //tested
route.put("/user/:id", authenticateToken, updateUser); //tested
route.put("/update/user/:id", authenticateToken, isAdmin, promoteUser); //tested
//profile routes
route.post("/createProfile/user/:id", authenticateToken, createProfile); //tested
route.put("/update/profile/:id", authenticateToken, updateProfile); //tested
route.get("/profile/:id", getProfile); //tested
//post routes
route.post("/createPost/user/:id", authenticateToken, createPost); //tested
route.get("/post/:id", singlePost); //tested
route.get("/posts", getAll); //tested
route.put("/update/post/:id", authenticateToken, updatePost); //tested
route.delete("/delete/post/:id", authenticateToken, deletePost); //tested

module.exports = route;
