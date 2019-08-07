require('dotenv').config()
const connection = require('../configs/db');
module.exports = {
    getLoanbooks: (search) => {
        console.log(search)
        return new Promise((resolve, reject) => {
            if (search) {
                connection.query("SELECT `loan_book`.*, `user`.`fullname`, `user`.`phone`, `book_manager`.`name` AS `title`, `book_manager`.`image`,`book_manager`.`writer` FROM loan_book INNER JOIN user ON loan_book.card_number = user.card_number INNER JOIN book_manager ON loan_book.id_book = book_manager.id_book WHERE loan_book.card_number LIKE ? OR user.fullname LIKE ? ORDER BY id_loanbook DESC", [`%${search}%`, `%${search}%`, `%${search}%`], (err, result) => {
                    if (!err) {
                        resolve(result)
                    } else {
                        reject(new Error(err))
                    }
                })
            } else {
                connection.query("SELECT `loan_book`.*, `user`.`fullname`, `user`.`phone`, `book_manager`.`name` AS `title`, `book_manager`.`image`,`book_manager`.`writer` FROM loan_book INNER JOIN user ON loan_book.card_number = user.card_number INNER JOIN book_manager ON loan_book.id_book = book_manager.id_book ORDER BY id_loanbook DESC", (err, result) => {
                    if (!err) {

                        resolve(result)
                    } else {
                        reject(new Error(err))
                    }
                })
            }
        })
    },
    loanbooksCardnumber: (card_number) => {
        return new Promise((resolve, reject) => {

            connection.query('SELECT `loan_book`.*, `user`.`fullname`, `user`.`phone`, `book_manager`.`name` AS `title`, `book_manager`.`image`,`book_manager`.`writer` FROM loan_book INNER JOIN user ON loan_book.card_number = user.card_number INNER JOIN book_manager ON loan_book.id_book = book_manager.id_book WHERE `user`.`card_number` = ? ORDER BY id_loanbook DESC', card_number, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    loanbooksConfirm: () => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT `loan_book`.*, `user`.`fullname`, `user`.`phone`, `book_manager`.`name` AS `title`, `book_manager`.`image`,`book_manager`.`writer` FROM loan_book INNER JOIN user ON loan_book.card_number = user.card_number INNER JOIN book_manager ON loan_book.id_book = book_manager.id_book WHERE `loan_book`.`information` = ? ORDER BY id_loanbook DESC', 'PENDING', (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    prosesConfirm: (id_loanbook, data) => {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE loan_book SET ? WHERE id_loanbook=?', [data, id_loanbook], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    loanbooksDetail: (id_loanbook) => {
        return new Promise((resolve, reject) => {
            console.log(id_loanbook)
            connection.query('SELECT loan_book.*, user.fullname FROM loan_book INNER JOIN user ON loan_book.card_number = user.card_number WHERE id_loanbook= ?', id_loanbook, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    updateLoanbooks: (id_loanbook, data) => {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE loan_book SET ? WHERE id_loanbook=?', [data, id_loanbook], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    updateborrow: (id_loanbook, data, id_book) => {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE loan_book SET ? WHERE id_loanbook=?', [data, id_loanbook], (err, result) => {
                if (!err) {
                    connection.query('UPDATE book_manager SET status = 1 WHERE id_book =?', id_book)
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
                    connection.query('UPDATE book_manager SET status= 0 WHERE id_book =?', data.id_book)
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    deleteLoanbooks: (id_loanbooks) => {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM loan_book WHERE id_loanbook = ?', id_loanbooks, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    cancelBorrow: (id_loanbooks, id_book) => {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM loan_book WHERE id_loanbook = ?', id_loanbooks, (err, result) => {
                if (!err) {
                    connection.query('UPDATE book_manager SET status= 1 WHERE id_book =?', id_book)
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    }
}