require('dotenv').config();
const express = require('express');
const app = express();

const port = process.env.SERVER_PORT;
app.use(require('./routers/books'));

app.listen(port, () => {
    console.log(`\n App Listen post ${port}`);
})
