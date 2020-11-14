const express = require('express');
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('connected to DB');
    })
    .catch((err) => {
        console.log(err);
    });


const PORT = process.env.PORT || 8000

const server = app.listen(PORT, () => console.log(` server running on port ${PORT}`));

process.on('exit', (code) => {
    console.log(`About to exit with code: ${code}`);
})