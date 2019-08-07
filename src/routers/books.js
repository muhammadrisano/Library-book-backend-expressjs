const express = require('express');
const Route = express.Router();
const BookController = require('../controllers/books')
const multer = require('multer');

const UploadImg = require('../helpers/uploadimg')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
})
const upload = multer({ storage: storage })
Route
    .get('/', BookController.getBooks)
    .get('/:id_book', BookController.bookDetail)
    .patch('/:id_book', BookController.updateBook)
    .post('/', upload.single('image'), BookController.insertBook)
    .delete('/:id_book', BookController.deleteBook)
// .get('/bookborrow', BookController.getBookBorrow)
module.exports = Route;