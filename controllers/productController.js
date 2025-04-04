const db = require("../utils/db").getConnection();

const all = async (req, res) => {
    const products = await db.collection("products").find().toArray();
    products
        ? res.status(200).json({
            message: "Products retrieved successfully",
            result: products,
        })
        : res.status(404).json({ message: "No products found" });
};

const show = async (req, res) => {
    const product = await db
        .collection("products")
        .findOne({ name: req.params.name });
    product
        ? res.status(200).json({
            message: "Product retrieved successfully",
            result: product,
        })
        : res.status(404).json({ message: "Product not found" });
};

const create = async (req, res) => {
    let newProduct = req.body;
    try {
        await db.collection('products').insertOne(newProduct);
        res.status(201).json({
            message: 'Product create successfully',
            result: newProduct
        })
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

const modify = async (req, res) => {
    try {
        const result = await db.collection('products').updateOne({ name: req.params.name }, { $set: req.body })
        if (result.matchedCount === 0) {
            res.status(404).json({
                error: 'Products is not found!'
            })
        } else {
            res.status(201).json({
                message: "Product modify is successfully",
                result: req.body
            })
        }
    } catch (err) {
        console.error("Error updating user:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const destroy = async (req, res) => {
    try {
        const result = await db.collection('products').deleteOne({ name: req.params.name })
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Product not found" });
        }
        res
            .status(200)
            .json({ message: "Product deleted successfully", result: req.params.name });
    } catch (error) {
        console.error("Error updating user:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    all,
    show,
    create,
    modify,
    destroy
};
