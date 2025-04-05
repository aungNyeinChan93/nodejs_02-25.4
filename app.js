const express = require("express");

const app = express();
app.use(express.json());

const { connectDB } = require("./utils/db");

// db conection and initialization
connectDB((err) => {
  if (err) {
    console.error("Failed to connect to the database:", err);
    return;
  } else {
    console.log("Database connected successfully");
    init();
  }
});

const init = () => {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });

  // home
  app.get("/", (req, res) => {
    res.send("Welcome to the home page!");
  });

  // test
  app.get("/test", (req, res) => {
    res.send("Hello World!");
  });

  // users
  const usersRouter = require("./routes/users");
  app.use("/api/users", usersRouter);

  // products
  const productsRouter = require("./routes/products");
  app.use("/api/products", productsRouter);

  // categories
  const categoriresRouter = require("./routes/categories");
  app.use("/api/categories", categoriresRouter);

  //posts
  const postsRouter = require("./routes/posts");
  app.use("/api/posts", postsRouter);
};
