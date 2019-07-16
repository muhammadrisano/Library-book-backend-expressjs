const loanbooksModels = require('../models/loanbooks');
const MissHelper = require('../helpers/helpers')


module.exports = {

    getLoanbooks: (req, res) => {
        const search = req.query.search
        loanbooksModels.getLoanbooks(search)
            .then((resultLoanbooks) => {
                const result = resultLoanbooks
                MissHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    loanbooksDetail: (req, res) => {
        const id_loanbooks = req.params.id_loanbooks
        loanbooksModels.loanbooksDetail(id_loanbooks)
            .then((resultLoanbooks) => {
                const result = resultLoanbooks
                MissHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    updateLoanbooks: (req, res) => {
        const id_loanbooks = req.params.id_loanbooks
        const { card_number, id_books, expired_date, forfeit, information } = req.body
        const data = {
            card_number,
            id_books,
            id_books,
            expired_date,
            forfeit,
            information,
            updated_at: new Date()
        }

        loanbooksModels.updateLoanbooks(id_loanbooks, data)
            .then((resultloanbooks) => {
                const result = resultloanbooks;
                MissHelper.response(res, result, 200, [id_loanbooks, data])
            })
            .catch((error) => {
                console.log(error)
            })
    }, insertLoanbook: (req, res) => {
        const { card_number, id_book, expired_date, forfeit, information } = req.body
        const data = {
            card_number,
            id_book,
            expired_date,
            forfeit,
            information,
            updated_at: new Date()
        }
        loanbooksModels.insertLoanbooks(data)
            .then((resultLoanbooks) => {
                const result = resultLoanbooks;
                MissHelper.response(res, result, 200, data)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    deleteLoanbooks: (req, res) => {
        const id_loanbooks = req.params.id_loanbooks
        bookModels.deleteLoanbooks(id_loanbooks)
            .then((resultLoanbooks) => {
                result = resultLoanbooks;
                MissHelper.result(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    }









}