const db = require("../utils/db").getConnection();

const create = async (req, res) => {
    const { title, description, userId } = req.body;

    const post = await db.collection("posts").insertOne({
        title,
        description,
        userId,
        createdAt: new Date().toLocaleDateString(),
    });
    post.acknowledged
        ? res.status(201).json({ message: 'Post create successfully!' })
        : res.status(500).json({ message: "Error creating post" });
}

const all = async (req, res) => {
    try {
        const posts = await db.collection("posts").find().toArray();
        posts.length > 0
            ? res.status(200).json(posts)
            : res.status(404).json({ message: "No posts found" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching posts" });
    }
}

const getByUserId = async (req, res) => {
    try {
        const posts = await db.collection("posts").find({ userId: Number(req.params.userId) }).toArray();
        posts.length > 0
            ? res.status(200).json(posts)
            : res.status(404).json({ message: "No posts found for this user" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching posts" });
    }
}

const destroy = async (req, res) => {
    const post = await db.collection("posts").deleteOne({ title: req.params.title });
    post.deletedCount > 0
        ? res.status(200).json({ message: 'Post deleted successfully!' })
        : res.status(404).json({ message: "Post not found" });
}

module.exports = {
    create, all, getByUserId, destroy
};