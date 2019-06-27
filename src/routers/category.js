const express = require('express');
const Route = express.Router();
const categoryController = require('../controllers/category');

Route
    .get('/', categoryController.getCategory)
    .get('/:id', categoryController.categoryDetail)
    .post('/', categoryController.insertCategory)
    .patch('/:id', categoryController.updateCategory)
    .delete('/:id', categoryController.deleteCategory)

module.exports = Route;