const express = require('express');
const Route = express.Router();
const BookController = require('../controllers/books')

Route
    .get('/', BookController.getBooks)
    .get('/:id_book', BookController.bookDetail)
    .patch('/:id_book', BookController.updateBook)
    .post('/', BookController.insertBook)
    .delete('/:id_book', BookController.deleteBook)

module.exports = Route;