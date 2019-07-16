const express = require('express');
const Route = express.Router();
const LoanbooksController = require('../controllers/loanbooks');

Route
    .get('/', LoanbooksController.getLoanbooks)
    .get('/:id_loanbook', LoanbooksController.loanbooksDetail)
    .patch('/:id_loanbook', LoanbooksController.updateLoanbooks)
    .post('/', LoanbooksController.insertLoanbooks)
    .delete('/:id_loanbook', LoanbooksController.deleteLoanbooks)

module.exports = Route;
