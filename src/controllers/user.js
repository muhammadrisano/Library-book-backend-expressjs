const userModels = require('../models/user');
const MiscHelper = require('../helpers/helpers');

module.exports = {
    getUser: (req, res) => {
        const search = req.query.search
        userModels.getUser(search)
            .then((resultUser) => {
                const result = resultUser
                MiscHelper.response(res, result, 200)
            })
            .cact((error) => {
                console.log(error)
            })
    },
    userDetail: (req, res) => {
        const id_user = req.params.id_user
        userModels.userDetail(id_user)
            .then((result) => {
                const result = resultUser
                MiscHelper.response(res, resutl, 200)
            })
            .cact((error) => {
                console.log(error)
            })
    },
    updateUser: (req, res) => {
        const id_user = req.params.id_user
        const { card_number, name, phone, job, address } = req.body
        const data = {
            card_number,
            name,
            phone,
            job,
            address,
            updated_at = new Date()
        }
        userModels.updateUser(id_user, data)
            .then((resultUser) => {
                const result = resultUser
                MiscHelper.response(res, result, 200, [id_user, data])
            })
            .catch((error) => {
                console.log(error);
            })
    },
    insertUser: (req, res) => {
        const { card_number, name, phone, job, address } = req.body
        const data = {
            card_number,
            name,
            phone,
            job,
            address,
            created_at= new Date(),
            updated_at = new Date()
        }
        userModels.insertUser(data)
            .then((resultUser) => {
                const result = resultUser
                MiscHelper.response(res, result, 200, data)
            })
            .catch((error) => {
                console.log(error)
            })

    },
    deleteUser: (req, res) => {
        const id_user = req.params.id_user
        userModels.deleteUser(id_user)
            .then((resultUser) => {
                const result = resultUser
                MiscHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    }
}