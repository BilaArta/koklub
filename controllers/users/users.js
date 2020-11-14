const model = require('../../models/users/users')


exports.getAllUsers = async (req,res) => {
    try {
        const users = await model.find()
        res.status(200).send(users)
    } catch (error) {
    res.status(400).send(error)        
    }
}

exports.createUser = async (req,res) => {
    try {
        const data = req.body ; 
        await model.create(data, function (err, data) {
            if (err) return console.log(err);
        });
        res.status(201).send(`success create data user ${data.name}`);
    } catch (error) {
        res.status(401).send(error);
    }
}