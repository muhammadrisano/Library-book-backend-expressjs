require('dotenv').config()
const connection = require('../configs/db')
module.exports = {
    getBooks: (search, page) => {
        return new Promise((resolve, reject) => {
            if (search) {
                connection.query("SELECT id_book, name, image, writer, description, location, book_manager.id_category, name_category, status, created_at, updated_at FROM book_manager INNER JOIN category ON book_manager.id_category = category.id_category WHERE book_manager.location LIKE ? OR category.name_category LIKE ? OR book_manager.name LIKE ? ORDER BY id_book desc", [`%${search}%`, `%${search}%`, `%${search}%`], (err, result) => {
                    if (!err) {
                        resolve(result)
                    } else {
                        reject(new Error(err))
                    }
                })
            } else if (page) {

                connection.query("SELECT id_book, name, image, writer, description, location,  book_manager.id_category, name_category, status, created_at, updated_at FROM book_manager INNER JOIN category ON book_manager.id_category = category.id_category ORDER BY id_book desc LIMIT " + (page * 12 - 12) + ", 12", (err, result) => {
                    if (!err) {
                        resolve(result)
                    } else {
                        reject(new Error(err))
                    }
                })

            } else {
                connection.query('SELECT id_book, name, image, writer, description, location, book_manager.id_category, name_category,  status, created_at, updated_at FROM book_manager INNER JOIN category ON book_manager.id_category = category.id_category ORDER BY id_book desc', (err, result) => {
                    if (!err) {
                        resolve(result)
                    } else {
                        reject(new Error(err))
                    }
                })
            }

        })
    },
    bookDetail: (id_book) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT id_book, name, image, writer, description, location, book_manager.id_category, name_category, status, created_at, updated_at FROM book_manager INNER JOIN category ON book_manager.id_category = category.id_category WHERE id_book=?', id_book, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    updateBook: (id_book, data) => {

        return new Promise((resolve, reject) => {
            connection.query('UPDATE book_manager SET ? WHERE id_book = ?', [data, id_book], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    insertBook: (data) => {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO book_manager SET ?', data, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    deleteBook: (id_book) => {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM book_manager WHERE id_book = ?', id_book, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    }
}