require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.SERVER_PORT;
// app.use(require('./src/routers/books'));
const userRoute = require('./src/routers/books')

app.listen(port, () => {
    console.log(`\n App Listen post ${port}`);
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/books', userRoute)