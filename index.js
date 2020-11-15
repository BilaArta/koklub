const express = require('express');
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config()

// import router
const userRouter = require('./routes/users/users')

const app = express()

// support parsing of application/json type post data
app.use(bodyparser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyparser.urlencoded({ extended: true }));

mongoose.Promise = Promise;
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
    useCreateIndex: true,
    useFindAndModify: false})

    .then(() => {
        console.log('connected to DB');
    })
    .catch((err) => {
        console.log(err);
    });


app.use('/users', userRouter)



const PORT = process.env.PORT || 8000

const server = app.listen(PORT, () => console.log(` server running on port ${PORT}`));

process.on('exit', (code) => {
    console.log(`About to exit with code: ${code}`);
})