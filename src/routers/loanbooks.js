const express = require('express');
const Route = express.Router();
const LoanbooksController = require('../controllers/loanbooks');
const Auth = require('../helpers/auth')
Route
    .all('/*', Auth.authInfo)
    .patch('/updateborrow/:id_loanbook', LoanbooksController.updateborrow)
    .get('/', LoanbooksController.getLoanbooks)
    .get('/:id_loanbook', LoanbooksController.loanbooksDetail)
    .get('/cardnumber/:card_number', LoanbooksController.loanbooksCardnumber)
    .get('/confirm/get', LoanbooksController.loanbooksConfirm)
    .patch('/prosesconfirm/:id_loanbook', LoanbooksController.prosesConfirm)
    .patch('/:id_loanbook', LoanbooksController.updateLoanbooks)
    .post('/', Auth.accesstoken, LoanbooksController.insertLoanbooks)
    .delete('/:id_loanbook', LoanbooksController.deleteLoanbooks)
    .patch('/cancelborrow/:id_loanbook', LoanbooksController.cancelBorrow)


module.exports = Route;
