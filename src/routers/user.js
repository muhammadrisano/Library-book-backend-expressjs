const express = require('express');
const Route = express.Router();
const userController = require('../controllers/user')
const Auth = require('../helpers/auth')
Route
    .all('/*', Auth.authInfo)
    .get('/', Auth.accesstoken, userController.getUser)
    .get('/:id_user', userController.userDetail)
    .patch('/:id_user', userController.updateUser)
    .post('/', userController.insertUser)
    .post('/register', userController.register)
    .post('/login', userController.login)
    .delete('/:id_user', userController.deleteUser)

module.exports = Route;