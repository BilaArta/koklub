const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const JWT = require('jsonwebtoken')
require('dotenv').config()

const userSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, 'Email address is required'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password : {
        type: String,
        required: true
    },
    token : String,
}, {
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
})

userSchema.pre('save', function(next) {
    var user = this
    // console.log(this);
    if(!user.isModified('password')) return next();
    
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if(err) return next(err);
        
        // console.log(user);
         bcrypt.hash(user.password, salt, (err, hash) => {
             if(err) return next(err);
             // Override user password with hased password 
             user.password = hash;
             next();
         })
    })
})

userSchema.methods.comparePassword =  function(candidatePassword, cb) {
    const isMatch = bcrypt.compare(candidatePassword, this.password)
    if(!isMatch) return cb('password dosen`t match');
    
    return isMatch
}

userSchema.methods.getSignedToken =  function(){
    return JWT.sign({id: this._id, name: this.name}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    })
}

const modelUser = mongoose.model('Users', userSchema)

module.exports = modelUser;