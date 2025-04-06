const express = require("express");

// backup
const { backup, callTest } = require('./backup/backup');
const calling = require('./backup/backup').backup().test;

const app = express();
app.use(express.json());

const { connectDB } = require("./utils/db");
const { connectDB: connectTestDB } = require("./utils/test");
const { connectDB: backupDB } = require('./utils/backup');


// db conection and initialization
connectDB((err) => {
  if (err) {
    console.error("Failed to connect to the database:", err);
    return;
  } else {
    console.log("Database connected successfully");

    // Initialize the server after successful connection
    init();

    // Test database connection
    connectTestDB(err => {
      if (err) {
        console.error("Failed to connect to the test database:", err);
        return;
      } else {
        console.log("Test Database connected successfully");
        test();
        backupDB((err) => {
          if (!err) {
            console.log("Backup Database connected successfully");
            backup();
            backup().test();
            callTest();
            calling();
          }
          else console.error("Failed to connect to the backup database:", err);
        })
      }
    })
  }
});

// for testing purposes only =>test_02 database connection
const test = () => {
  const testsRouter = require("./routes/tests");
  app.use("/api/tests", testsRouter);
}

// test_01 database connection
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

  // DC-superHeros
  const superHerosRouter = require('./routes/superHeros')
  app.use('/api/superHeros', superHerosRouter)
};

