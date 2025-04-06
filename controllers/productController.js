const { ObjectId } = require("mongodb");

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
        .findOne({ name: { $regex: new RegExp(`^${req.params.name}`) } });
    // .findOne({ $where: `this.name = ${req.params.name}` });
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
        const id = ObjectId.createFromHexString(req.params.id);
        const result = await db.collection('products').deleteOne({ _id: id })
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

const onlyName = async (req, res) => {
    const productNames = await db.collection('products').find().project({ name: 1, _id: 0 }).toArray();
    productNames.length > 0
        ? res.status(200).json({
            message: "Product names retrieved successfully",
            result: productNames,
        })
        : res.status(404).json({ message: "No products" });
}

const createMany = async (req, res) => {
    const newProducts = req.body.products;
    try {
        const result = await db.collection('products').insertMany(newProducts);
        result.acknowledged
            ? res.status(201).json({
                message: 'Products created successfully',
                result: newProducts
            })
            : res.status(404).json({ message: "No products" });
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

const updatePrice = async (req, res) => {
    const oldPrice = Number(req.params.price);  // This should be the old price you want to update
    try {
        const result = await db.collection('products').updateMany({ price: oldPrice }, { $set: req.body })
        if (result.matchedCount === 0) {
            return res.status(404).json({
                error: 'Products is not found!'
            })
        }
        res.status(201).json({
            message: "Product prices modify is successfully",
            result: result.acknowledged
        })
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const destroyMany = async (req, res) => {
    try {
        const result = await db.collection('products').deleteMany({ price: Number(req.params.price) })
        if (result.deletedCount == 0) {
            return res.status(404).json({
                message: 'not found!'
            })
        }
        res.status(200).json({
            message: 'Delete success '
        })
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


const filter = async (req, res) => {
    try {
        const filterPrice = Number(req.params.price);
        const filterName = req.params.name
        // const result = await db.collection('products').find({ price: { $in: [filterPrice, 1000, 2000, 3000] } }).toArray(); //eq,ne,in,nin,gt,lt,gte,lte

        const result = await db.collection('products')
            // .find({ $where: `this.price == ${filterName} && this.name == ${filterName}` })
            .find({ $and: [{ price: { $eq: filterPrice } }, { name: filterName }] }) //$and ,$or ,$nor == nin ,$not === !
            .toArray();

        result
            ? res.status(200).json({ message: " success", result: result })
            : res.status(404).json({ message: "fail" })
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

//push ->add, pull->remove , pop->1=last,-1=first,addToSet, set,unset
const addColor = async (req, res) => {
    try {
        const id = ObjectId.createFromHexString(req.params.id);
        // const result = await db.collection('products').updateOne({ _id: id }, { $set: { test: req.body.color } });
        // const result = await db.collection('products').updateOne({ _id: id }, { $unset: { test: req.body } });
        // const result = await db.collection('products').updateOne({ _id: id }, { $pop: { color: 1 } });
        // const result = await db.collection('products').updateOne({ _id: id }, { $push: { color: req.body.color } });  
        // const result = await db.collection('products').updateOne({ _id: id }, { $pull: { color: req.body.color } });
        const result = await db.collection('products').updateOne({ _id: id }, { $addToSet: { color: req.body.color } });
        result.modifiedCount > 0
            ? res.status(200).json({
                message: 'color added success',
                result: result
            })
            : res.status(404).json({ message: "not Found!" })
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


module.exports = {
    all,
    show,
    create,
    modify,
    destroy,
    onlyName,
    createMany,
    updatePrice,
    destroyMany,
    filter,
    addColor
};
