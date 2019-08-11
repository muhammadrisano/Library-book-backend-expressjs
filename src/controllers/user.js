const userModels = require('../models/user');
const MiscHelper = require('../helpers/helpers');
const jwt = require('jsonwebtoken')
const cloudinary = require('cloudinary')
module.exports = {
    getUser: (req, res) => {
        const search = req.query.search
        console.log(search)
        userModels.getUser(search)
            .then((resultUser) => {
                const result = resultUser
                console.log(result)
                MiscHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    userDetail: (req, res) => {
        const id_user = req.params.id_user
        userModels.userDetail(id_user)
            .then((resultUser) => {
                const result = resultUser
                MiscHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    register: (req, res) => {

        const salt = MiscHelper.generateSalt(18)
        const passwordHash = MiscHelper.setPassword(req.body.password, salt)
        const data = {
            email: req.body.email,
            card_number: req.body.card_number,
            fullname: req.body.fullname,
            password: passwordHash.passwordHash,
            salt: passwordHash.salt,
            token: '',
            phone: req.body.phone,
            job: req.body.job,
            address: req.body.address,
            status: 1,
            role_id: 3,
            photo: 'https://heritagevillagecincinnati.org/wp-content/uploads/2017/12/icon.png',
            created_at: new Date(),
            updated_at: new Date()
        }
        console.log(data)
        userModels.register(data)
            .then((resultRegister) => {
                MiscHelper.response(res, resultRegister, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    login: (req, res) => {
        const email = req.body.email
        const password = req.body.password
        console.log(req.headers['x-control-user']);
        userModels.getByEmail(email)
            .then((result) => {
                const dataUser = result[0]

                const usePassword = MiscHelper.setPassword(password, dataUser.salt).passwordHash
                if (usePassword === dataUser.password) {
                    // dataUser.token = jwt.sign({
                    //     userid: dataUser.id_user
                    // }, process.env.SECRET_KEY, { expiresIn: '1h' })

                    dataUser.token = jwt.sign({
                        userid: dataUser.id_user
                    }, process.env.SECRET_KEY, { expiresIn: '1h' });
                    delete dataUser.salt
                    delete dataUser.password
                    console.log('Token stored !' + dataUser.token)
                    return MiscHelper.response(res, dataUser, 200)
                } else {
                    return MiscHelper.response(res, null, 403, 'Wrong password !')
                }
            })
            .catch((error) => {
                console.log(error)
            })
    },
    updateUser: async (req, res) => {
        let path = req.file.path
        const id_user = req.params.id_user
        const { card_number, fullname, phone, job, address } = req.body

        let geturl = async (req) => {
            cloudinary.config({
                cloud_name: 'dirm0rxsm',
                api_key: '736962856653652',
                api_secret: 'P9fSm3HfcRf9trnoK6Sjng9DrKM'
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
            card_number,
            fullname,
            photo: await geturl(),
            // photo: 'http://localhost:4000/' + req.file.path,
            phone,
            job,
            address,
            updated_at: new Date()
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
            created_at: new Date(),
            updated_at: new Date()
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