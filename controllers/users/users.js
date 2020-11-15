const model = require('../../models/users/users')


exports.getAllUsers = async (req,res) => {
    try {
        const users = await model.find()
        res.status(200).send(users)
    } catch (error) {
        res.status(400).send(error)        
    }
}

exports.getOneUser = async (req,res) => {
    try {
        let id = req.params.id
        //test hasing password
        let pass = req.body.password;
        await model.findById(id, (err, user) => {
            // console.log(user);
            if(err) return res.status(400).send(err);
            // test hasing password
            user.comparePassword(pass, (err, isMatch) => {
                if(err) return console.log(err);
                // console.log(isMatch);
                res.status(200).send({
                    data : user,
                    message : `password : ${isMatch}`
                });
            })
        })
    } catch (error) {
        res.status(400).send(error)
    }
}

exports.createUser = async (req,res) => {
    try {
        const data = req.body 
        console.log(data);
        await model.create(data, function (err, data) {
            if (err){
                console.log(err);
                res.status(400).send(err)
            }
            res.status(201).send(`success create data user ${data.name}`);
        });
    } catch (error) {
        res.status(401).send(error);
    }
}

exports.editUser = async (req,res) => {
    try {
        const id = req.params.id
        var conditions = {
            _id : id
        }

        var update = req.body

        const updateUser = await model.findOneAndUpdate(conditions, update, (err,result) => {
            if(err) {
                return err
            }else {
                return result
            }
        })

        if (!updateUser) {
            res.status(400).send("error update user")
        } else {
            res.status(200).send("success update user")
        }

    } catch (error) {  
        res.status(400).send(error)
    }
}

exports.deleteUser = async (req,res) => {
    try {
        var id = req.params.id
        var conditions = {
            _id : id
        }
        const deleting = await model.deleteOne(conditions, (err) => {
            if (err) {
                return err
            }
        })

        if(!deleting) {
            res.status(400).send(err)
        }else {
            res.status(200).send(`success delete user id : ${id}`)
        }

    } catch (error) {
        res.status(400).send(error)
    }
}