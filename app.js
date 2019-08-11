require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.SERVER_PORT;
const cors = require('cors')
const xssFilter = require('x-xss-protection');
const logger = require('morgan');

const bookRoute = require('./src/routers/books')
const categoryRoute = (require('./src/routers/category'))
const information = require('./src/helpers/information')
const loanbooksRoute = require('./src/routers/loanbooks')
const userRoute = require('./src/routers/user')

const whitelist = process.env.WHITELIST

// const corsOptions = (req, callback) => {
//     if (whitelist.split(',').indexOf(req.header('Origin')) !== -1) {
//         console.log('Success')
//         return callback(null, {
//             origin: true
//         })
//     } else {
//         console.log('Failed')
//         return callback(null, {
//             origin: false
//         })
//     }
// }

app.use(cors())
// app.options('*', cors(corsOptions))
app.use(xssFilter())
app.use(logger('dev'))
// app.use('/uploads', express.static('uploads'));
app.use(express.static(__dirname + '/uploads'))
app.use('/photo', express.static('photo'));

app.use(express.static(path.join(__dirname, 'public')));
app.listen(port, () => {
    console.log(`\n App Listen post ${port}`);
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/books', bookRoute)
app.use('/category', categoryRoute)
app.use('/', information)
app.use('/loanbooks', loanbooksRoute)
app.use('/user', userRoute)