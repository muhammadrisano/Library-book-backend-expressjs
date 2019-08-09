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
        const bookborrow = req.query.bookborrow
        bookModels.getBooks(search, page, bookborrow)
            .then((resultBook) => {
                const result = resultBook
                console.log(result);
                MiscHelper.response(res, result, 200, false, jumlah)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    // getBookBorrow: (req, res) => {
    //     console.log("helo asd sadf s daf ")
    //     const search = req.query.search
    //     bookModel.getBookBorrow(search)
    //         .then((resultBook) => {
    //             const result = resultBook;
    //             console.log(result)
    //             MiscHelper.response(res, result, 200)
    //         })
    //         .catch((error) => {
    //             console.log(error)
    //         })
    // },
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

        let geturl = async (req) => {
            cloudinary.config({
                cloud_name: 'dfezrynjl',
                api_key: '186247977836927',
                api_secret: 'aCoxhhJ_hmH37s7c_Ql5ugbMtfI'
            })

            let dataCloudinary
            await cloudinary.uploader.upload(path, (result) => {
                const fs = require('fs')
                fs.unlinkSync(path)
                dataCloudinary = result.url
            })

            return dataCloudinary
        }

        const data = {
            name,
            image: await geturl(),
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