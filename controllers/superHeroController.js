const { ObjectId } = require("mongodb");

const db = require("../utils/db").getConnection();


const all = async (req, res) => {
    try {
        const heros = await db.collection('heros').find().toArray();
        if (heros) {
            res.status(200).json({
                message: 'All SuperHeros',
                result: heros
            });
        } else {
            res.status(404).json({ message: "Heros not found!" })
        }
    } catch (error) {
        console.error('server is error')
        res.json({ error: error })
    }
}

const create = async (req, res) => {
    const result = await db.collection('heros').insertOne(req.body);
    res.json({
        message: "success",
        result: result
    })
}

const skillAdd = async (req, res) => {
    const id = ObjectId.createFromHexString(req.params.id);
    const result = await db.collection('heros').updateOne({ _id: id }, { $addToSet: { skill: req.body.skill } })
    if (result.acknowledged) {
        res.json({ mess: "success", result: result })
    }
    else res.json({ mess: 'fail' })
}


const skillBan = async (req, res) => {
    const id = ObjectId.createFromHexString(req.params.id);
    const result = await db.collection('heros').updateOne({ _id: id }, { $pull: { skill: req.body.skill } })
    if (result.acknowledged) {
        res.json({ mess: "success", result: result })
    }
    else res.json({ mess: 'fail' })
}


module.exports = {
    all, create, skillAdd, skillBan
}