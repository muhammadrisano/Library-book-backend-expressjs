const bookModels = require('../models/books');
const MiscHelper = require('../helpers/helpers');



module.exports = {
    getIndex: (req, res) => {
        return res.json({ message: 'Hello Library Book API' })
    },
    getBooks: (req, res) => {
        var jumlah = 0
        bookModels.getBooks()
            .then((resultBook) => {
                jumlah = resultBook.length
            })
        const search = req.query.search
        const page = req.query.page
        bookModels.getBooks(search, page)
            .then((resultBook) => {
                const result = resultBook
                console.log(result);
                MiscHelper.response(res, result, 200, jumlah)
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
        const { name, image, writer, description, location, id_category, status } = req.body
        const data = {
            name,
            image,
            writer,
            description,
            location,
            id_category,
            status,
            updated_at: new Date()
        }
        bookModels.updateBook(id_book, data)
            .then((resultBook) => {
                const result = resultBook
                MiscHelper.response(res, result, 200, [id_book, data])
            })
            .catch((error) => {
                console.log(error)
            })
    },
    insertBook: (req, res) => {

        const { name, writer, description, location, id_category } = req.body
        const data = {
            name,
            image: 'http://localhost:4000/' + req.file.path,
            writer,
            description,
            location,
            id_category,
            status: 0,
            created_at: new Date(),
            updated_at: new Date()
        }
        bookModels.insertBook(data)
            .then((resultBook) => {
                const result = resultBook
                MiscHelper.response(res, result, 200, data)
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