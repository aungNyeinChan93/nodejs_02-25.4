const db = require("../utils/db").getConnection();

const all = async (req, res) => {
    try {
        const categories = await db.collection("categories").find().toArray();
        res.status(200).json(categories);
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const show = async (req, res) => {
    try {
        const category = await db.collection("categories").findOne({ name: req.params.name });
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json(category);
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const create = async (req, res) => {
    try {
        const newCategory = req.body;
        const result = await db.collection("categories").insertOne(newCategory);
        res.status(201).json(newCategory);
    } catch (error) {
        console.error("Error creating category:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const modify = async (req, res) => {
    try {
        const updatedCategory = req.body;
        const result = await db.collection("categories").updateOne({ name: req.params.name }, { $set: updatedCategory });
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json(updatedCategory);
    } catch (error) {
        console.error("Error updating category:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const destroy = async (req, res) => {
    try {
        const result = await db.collection("categories").deleteOne({ name: req.params.name });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        console.error("Error deleting category:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    all, show, create, modify, destroy
};  