const model = require('../../models/users/users')
const ErrorResponse = require('../../utils/errorResponse')
const asyncHandler = require('../../middleware/async');
require('dotenv').config()


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

exports.signIn = asyncHandler( async (req,res, next) => {
        const {email, password} = req.body

        const user = await model.findOne({email});
        if (!user) return next(new ErrorResponse(`User not found with email :${email}`, 404));

        const isMatch = await user.comparePassword(password, next);   
        if(!isMatch) return next(new ErrorResponse('Error password', 401));

        generateToken(user, 200, res);
})

exports.signout = asyncHandler( async (req,res, next) => {
        res.cookie('token', 'none', {
            expires: new Date(Date.now() + 10 * 1000),
            httpOnly: true
        })
    
        res 
            .status(200)
            .json({
                success: true,
                data: {}
            })
     
})


const generateToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    const options = {
        expires : new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE *24*60*60*1000 ),
        httpOnly: true
    }
    res
        .status(200)
        .cookie('token', token, options)
        .json({
            success: true,
            token
        })
}