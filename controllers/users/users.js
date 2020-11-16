const model = require('../../models/users/users')
const ErrorResponse = require('../../utils/errorResponse')
const asyncHandler = require('../../middleware/async');



exports.getAllUsers = asyncHandler( async (req,res, next) => {
        const users = await model.find()
        res
            .status(200)
            .json({
                success: true,
                count : users.length,
                data : users
        })
});

exports.getOneUser = asyncHandler( async (req,res, next) => {
        let id = req.params.id
        const user = await model.findById({_id: id})
        if(!user) return next(new ErrorResponse(`User not found with id :${req.params.id}`, 404))

        res
            .status(200)
            .json({
                success: true,
                data: user
            })
})

exports.createUser = asyncHandler( async (req,res, next) => {
        const data = req.body 
        
        const user = await model.create(data);
        if(!user) return next(new ErrorResponse('Error create new user', 400));

        res
            .status(200)
            .json({
                success: true,
                data: user
            })
})

exports.editUser = asyncHandler( async (req,res, next) => {
        const id = req.params.id
        var conditions = {
            _id : id
        }
        var update = req.body
        const updateUser = await model.findOneAndUpdate(conditions, update)
        if(!updateUser) return next(new ErrorResponse(`Error update user not found with id :${req.params.id}`, 404))

        res 
            .status(200)
            .json({
                success: true,
                data: updateUser
            })
})

exports.deleteUser = asyncHandler( async (req,res,next) => {

        var id = req.params.id
        var conditions = {
            _id : id
        }
        const user = await model.deleteOne(conditions)
        if(user.deletedCount === 0) return next( new ErrorResponse(`Error delete user with id :${req.params.id}`, 404))

        res
            .status(200)
            .json({
                success: true,
                data: user
            })
})

exports.signIn = async (req,res) => {
    try {
        const {email, password} = req.body
        const user = await model.findOne({email});
        if (!user) return res.status(404).json({
            status: false,
            message: "User not found"
        })

        const token = await user.getSignedToken();
        res.status(200).json({
            status: true,
            user : user,
            token : token
        })
    } catch (error) {
        res.status(400).json(error)
    }

}