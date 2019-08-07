const express = require('express');
const Route = express.Router();
const userController = require('../controllers/user')
const Auth = require('../helpers/auth')
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './photo/')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
})

const upload = multer({ storage: storage })
Route
    .all('/*', Auth.authInfo)
    .get('/', Auth.accesstoken, userController.getUser)
    .get('/:id_user', userController.userDetail)
    .patch('/:id_user', upload.single('photo'), userController.updateUser)
    .post('/', userController.insertUser)
    .post('/register', userController.register)
    .post('/login', userController.login)
    .delete('/:id_user', userController.deleteUser)

module.exports = Route;