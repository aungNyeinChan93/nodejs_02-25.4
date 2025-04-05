const db = require("../utils/test").getConnection();

const post_create = async (req, res) => {
    try {
        const { title, content } = req.body;
        const post = { title, content };
        const result = await db.collection("posts").insertOne(post);
        res.status(201).json({ message: "Post created", postId: result.insertedId });
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

const all = async (req, res) => {
    try {
        const posts = await db.collection("posts").find().toArray();
        res.status(200).json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    post_create, all
}