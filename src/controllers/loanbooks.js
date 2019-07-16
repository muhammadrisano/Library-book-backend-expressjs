const loanbooksModels = require('../models/loanbooks');
const MissHelper = require('../helpers/helpers')


module.exports = {

    getLoanbooks: (req, res) => {
        const search = req.query.search
        loanbooksModels.getLoanbooks(search)
            .then((resultLoanbooks) => {
                const result = resultLoanbooks
                console.log(result);
                MissHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    loanbooksDetail: (req, res) => {
        const id_loanbook = req.params.id_loanbook
        loanbooksModels.loanbooksDetail(id_loanbook)
            .then((resultLoanbooks) => {
                const result = resultLoanbooks
                MissHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    updateLoanbooks: (req, res) => {
        const id_loanbook = req.params.id_loanbook
        const { card_number, id_book, expired_date, forfeit, information } = req.body
        const data = {
            card_number,
            id_book,
            expired_date,
            forfeit,
            information,
            updated_at: new Date()
        }
        loanbooksModels.updateLoanbooks(id_loanbook, data)
            .then((resultloanbooks) => {
                const result = resultloanbooks;
                MissHelper.response(res, result, 200, [id_loanbook, data])
            })
            .catch((error) => {
                console.log(error)
            })
    }, insertLoanbooks: (req, res) => {
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
        const id_loanbooks = req.params.id_loanbook
        loanbooksModels.deleteLoanbooks(id_loanbooks)
            .then((resultLoanbooks) => {
                result = resultLoanbooks;
                MissHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    }









}