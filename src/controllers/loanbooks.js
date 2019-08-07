const loanbooksModels = require('../models/loanbooks');
const MissHelper = require('../helpers/helpers');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })



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
    loanbooksCardnumber: (req, res) => {
        console.log('loanbookscardnumber')
        const card_number = req.params.card_number
        console.log(card_number)
        loanbooksModels.loanbooksCardnumber(card_number)
            .then((resultLoanbooks) => {
                const result = resultLoanbooks
                MissHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    loanbooksConfirm: (req, res) => {

        loanbooksModels.loanbooksConfirm()
            .then((resultloanbooks) => {
                const result = resultloanbooks
                MissHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    prosesConfirm: (req, res) => {
        console.log('proses confirm')
        const id_loanbook = req.params.id_loanbook
        const data = { information: req.body.information }
        loanbooksModels.prosesConfirm(id_loanbook, data)
            .then((resultloanbooks) => {
                const result = resultloanbooks
                MissHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    updateborrow: (req, res) => {
        console.log("update borrow")
        const id_loanbook = req.params.id_loanbook
        const id_book = req.body.id_book
        const data = {
            forfeit: req.body.forfeit,
            information: "SELESAI",
            updated_at: new Date()
        }
        console.log(id_loanbook)
        console.log(id_book)
        console.log(data)
        loanbooksModels.updateborrow(id_loanbook, data, id_book)
            .then((resultLoanbooks) => {
                const result = resultLoanbooks
                MissHelper.response(res, result, 200)
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
    },
    cancelBorrow: (req, res) => {
        const id_loanbooks = req.params.id_loanbook
        const id_book = req.body.id_book
        console.log(id_loanbooks)
        console.log(id_book)
        loanbooksModels.cancelBorrow(id_loanbooks, id_book)
            .then((resultLoanbooks) => {
                result = resultLoanbooks;
                MissHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    }









}