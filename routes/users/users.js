const express = require('express');
const router = express.Router();
const {getAllUsers, createUser, getOneUser} = require('../../controllers/users/users')

// Method GET
// Desc get all users
// Public
router.get('/', getAllUsers);


// @Params PASSWORD
// Method GET
// Desc get one user
// Public
router.get('/:id', getOneUser);

// @Params [NAME, EMAIL, PASSWORD]
// Method POST
// Desc create a new user
// Public
router.post('/', createUser);


// Method PUT
// Desc edit a user
// Private
router.put('/:id', (req,res) => console.log('put method'));


// Method DELETE
// Desc delete a user
// Private
router.delete('/:id', (req,res) => console.log('delete method'));

module.exports = router;