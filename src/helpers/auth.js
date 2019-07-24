const jwt = require('jsonwebtoken');
const MiscHelper = require('../helpers/helpers')

const allowedAccess = process.env.REQUEST_HEADERS

module.exports = {

    authInfo: (req, res, next) => {
        const headerAuth = req.headers['authorization']
        const headerSecret = req.headers['x-access-token']

        if (headerAuth !== allowedAccess) {
            return MiscHelper.response(res, null, 401, 'Unauthorized, Need access token!')
        } else if (typeof headerSecret === 'undefined') {
            next()
        } else {
            const bearerToken = headerSecret.split(' ')
            const token = bearerToken[1]
            req.token = token
            console.log('Token stored !' + token)
            next()
        }
    },
    accesstoken: (req, res, next) => {
        const secretKey = process.env.SECRET_KEY
        const accessToken = req.token
        const userToken = req.headerSecret['x-constol-user']

        jwt.verify(accessToken, secretKey, (err, decoded) => {
            if (err && err.name === 'TokenExpiredError') return MissHelper.response(res, null, 401, 'Invalid Token')
            if (err && err.name === 'JsonWebTokenError') return MiscHelper.response(res, null, 401, 'Invalid Token')
            if (parseInt(userToken) !== parseInt(decoded.userid)) return MiscHelper.response(res, null, 401, 'Invalid User Token')
            console.log(decoded)
            next()

        })
    }
}