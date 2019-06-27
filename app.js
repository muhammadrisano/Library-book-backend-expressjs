require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.SERVER_PORT;
// app.use(require('./src/routers/books'));
const bookRoute = require('./src/routers/books')
const categoryRoute = (require('./src/routers/category'))
const information = require('./src/helpers/information')
app.listen(port, () => {
    console.log(`\n App Listen post ${port}`);
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/books', bookRoute)
app.use('/category', categoryRoute)
app.use('/', information)