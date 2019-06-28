require('dotenv').config()
const connection = require('../configs/db')
// komentart
module.exports = {
    getBooks: (search) => {
        return new Promise((resolve, reject) => {
            if (search) {
                connection.query("SELECT id_book, name, writer, location, name_category, created_at, updated_at FROM book_manager INNER JOIN category ON book_manager.id_category = category.id_category WHERE book_manager.location LIKE '%" + search + "%' OR category.name_category LIKE'%" + search + "%'", (err, result) => {
                    if (!err) {
                        resolve(result)
                    } else {
                        reject(new Error(err))
                    }
                })
            } else {
                connection.query('SELECT id_book, name, writer, location, name_category, created_at, updated_at FROM book_manager INNER JOIN category ON book_manager.id_category = category.id_category', (err, result) => {
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
            connection.query('SELECT id_book, name, writer, location, name_category, created_at, updated_at FROM book_manager INNER JOIN category ON book_manager.id_category = category.id_category WHERE id_book=?', id_book, (err, result) => {
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