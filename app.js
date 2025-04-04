const express = require("express");

const app = express();
app.use(express.json());

const { connectDB, getConnection } = require("./utils/db");

let db;

connectDB((err) => {
  if (err) {
    console.error("Failed to connect to the database:", err);
    return;
  } else {
    console.log("Database connected successfully");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
    db = getConnection();
  }
});

// users
const usersRouter = require("./routes/users");
app.use("/api/users", usersRouter);

// test
app.get("/test", (req, res) => {
  res.send("Hello World!");
});
