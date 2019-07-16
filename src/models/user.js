require('dotenv').config()
const connection = require('../configs/db')

module.exports = {
    getUser: (search) => {
        return Promise((resolve, reject) => {
            if (search) {
                connection.query("SELECT * FROM user WHERE card_number LIKE ?, OR name LIKE ?", [`%${search}%`], (err, result) => {
                    if (!err) {
                        resolve(result)
                    } else {
                        reject(new Error(err))
                    }
                })
            } else {
                connection.query("SELECT * FROM user", (err, result) => {
                    if (!err) {
                        resolve(result)
                    } else {
                        reject(new Error(err))
                    }
                })
            }

        })
    },
    userDetail: (id_user) => {
        return Promise((resolve, reject) => {
            connection.query("SELECT * FROM user WHERE id_user = ?", id_user, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    updateUser: (id_user, data) => {
        return new Promise((resolve, reject) => {
            connection.query("UPDATE user SET ? WHERE id_user =?", [data, user_id], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    insertUser: (data) => {
        return new Promise((resolve, reject) => {
            connection.query("INSERT INTO user SET ?", data, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    deleteUser: (id_user) => {
        return new Promise((resolve, reject) => {
            connection.query("DELETE user WHERE id_user = ?", id_user, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error)
                }
            })
        })
    }

}