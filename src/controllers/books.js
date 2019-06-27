const bookModels = require('../models/books');
const MiscHelper = require('../helpers/helpers');

module.exports = {
    getIndex: (req, res) => {
        return res.json({ message: 'Hello Library Book API' })
    },
    getBooks: (req, res) => {
        const search = req.query.search
        bookModels.getBooks(search)
            .then((resultBook) => {
                const result = resultBook
                MiscHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    bookDetail: (req, res) => {
        const id_book = req.params.id_book
        bookModels.bookDetail(id_book)
            .then((resultBook) => {
                const result = resultBook
                MiscHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    updateBook: (req, res) => {
        const id_book = req.params.id_book
        const { name, writer, location, id_category } = req.body
        const data = {
            name,
            writer,
            location,
            id_category
        }
        bookModels.updateBook(id_book, data)
            .then((resultBook) => {
                const result = resultBook
                MiscHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    insertBook: (req, res) => {
        const { name, writer, location, id_category } = req.body
        const data = {
            name,
            writer,
            location,
            id_category
        }
        bookModels.insertBook(data)
            .then((resultBook) => {
                const result = resultBook
                MiscHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    deleteBook: (req, res) => {
        const id_book = req.params.id_book
        bookModels.deleteBook(id_book)
            .then((resultBook) => {
                const result = resultBook
                MiscHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    }






}