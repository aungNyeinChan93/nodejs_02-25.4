const { getConnection } = require("../utils/db");

const all = (req, res) => {
  let users = [];
  const db = getConnection();
  db.collection("users")
    .find()
    .forEach((user) => {
      users.push(user);
    })
    .then(() => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.error("Error fetching users:", err);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

const create = (req, res) => {
  let db = getConnection();
  let user = req.body;
  db.collection("users")
    .insertOne(user)
    .then(() => {
      res.status(201).json(user);
    })
    .catch((err) => {
      console.error("Error creating user:", err);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

const show = (req, res) => {
  let db = getConnection();
  let userName = req.params.name;
  db.collection("users")
    .findOne({ name: userName })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json(user);
    })
    .catch((err) => {
      console.error("Error fetching user:", err);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

const modify = async (req, res) => {
  // Implement the modify function here
  let db = getConnection();
  let userName = req.params.name;
  try {
    const result = await db
      .collection("users")
      .updateOne({ name: userName }, { $set: req.body });

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User updated successfully", user: req.body });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const destroy = async (req, res) => {
  let db = getConnection();
  let userName = req.params.name;
  try {
    const result = await db.collection("users").deleteOne({ name: userName });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User deleted successfully", user: userName });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { all, create, show, modify, destroy };
