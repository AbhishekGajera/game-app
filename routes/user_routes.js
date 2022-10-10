const express = require('express');
const router = express.Router();
const Controller = require('../controller/user_controller')

//Post Method
router.post('/register',Controller.create_user)

//Get all Method
router.get('/getAll',Controller.getAllUsers)

//Get by ID Method
router.get('/getOne/:id',  Controller.getUserbyId)

//Update by ID Method
router.patch('/update/:id', Controller.updateUser)

//Delete by ID Method
router.delete('/delete/:id', Controller.deleteUser)

module.exports = router;