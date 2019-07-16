require('dotenv').config()

const connection = require('../configs/db');
module.exports = {
    getLoanbooks: (search) => {
        return new Promise((resolve, reject) => {
            if (search) {
                connection.query("SELECT `loan_book`.*, `user`.`name` FROM loan_book INNER JOIN user ON loan_book.card_number = user.card_number WHERE loan_book.card_number LIKE ? OR user.name LIKE ?", [`%${search}%`, `%${search}%`, `%${search}%`], (err, result) => {
                    if (!err) {
                        resolve(result)
                    } else {
                        reject(new Error(err))
                    }
                })
            } else {
                connect.query("SELECT loan_book.*, user.name FROM loan_book INNER JOIN user ON loan_book.card_number = user.card_number", (err, result) => {
                    if (!err) {
                        resolve(result)
                    } else {
                        reject(new Error(err))
                    }
                })
            }
        })
    },
    loanbooksDetail: (id_loanbooks) => {
        return new Promise((result, reject) => {
            connection.query('SELECT loan_book.*, user.name FROM loan_book INNER JOIN user ON loan_book.card_number = user.card_number WHERE id_book= ?', id_loanbooks, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    insertLoanbooks: (data) => {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO loan_book SET ?', data, (err, result) => {
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
            connection.query('DELETE FROM loan_book WHERE id_book = ?', id_book, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    }
}