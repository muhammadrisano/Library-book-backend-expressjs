const express = require('express');
const Route = express.Router();
const userController = require('../controllers/user')

Route
    .get('/', userController.getUser)
    .get('/:id_user', userController.userDetail)
    .patch('/:id_user', userController.updateUser)
    .post('/', userController.insertUser)
    .delete('/:id_user', userController.deleteUser)

module.exports = Route;