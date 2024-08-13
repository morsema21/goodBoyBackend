const { app } = require("../src/shared");
const PORT = process.env.PORT || 3000;

const cors = require("cors");
app.use(cors());

app.listen(PORT, () => {
  console.log(`I am listening on PORT number ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Does this work");
});

const userRoutes = require("../src/components/routes/userRoutes");
app.use("/", userRoutes);
