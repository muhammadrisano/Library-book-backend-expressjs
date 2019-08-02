const express = require('express');
const Route = express.Router();
const LoanbooksController = require('../controllers/loanbooks');
const Auth = require('../helpers/auth')
Route
    .all('/*', Auth.authInfo)
    .get('/', LoanbooksController.getLoanbooks)
    .get('/:id_loanbook', LoanbooksController.loanbooksDetail)
    .get('/cardnumber/:card_number', LoanbooksController.loanbooksCardnumber)
    .patch('/:id_loanbook', LoanbooksController.updateLoanbooks)
    .post('/', Auth.accesstoken, LoanbooksController.insertLoanbooks)
    .delete('/:id_loanbook', LoanbooksController.deleteLoanbooks)

module.exports = Route;
