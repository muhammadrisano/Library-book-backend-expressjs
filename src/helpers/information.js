const express = require('express');
const bodyParser = require('body-parser');
const app = express();


app.get('/', (req, res) => {
    res.status(200).json({
        status: 200,
        title: "FREE Library Book Rest API",
        mesage: "You can use Library Book Rest API available with the instructions below",
        instructions: [
            {
                subtitles: "get all books or Search book",
                method: "get",
                link: "http://libraryapi.muhammadrisano.online/book or http://libraryapi.muhammadrisano.online/book?search=keywords"
            },
            {
                subtitles: "get detail books",
                method: "get",
                link: "http://libraryapi.muhammadrisano.online/book/{id}"
            },
            {
                subtitles: "input new book",
                method: "post",
                link: "http://libraryapi.muhammadrisano.online/book",
                key: "name,writer,location,categori_id"

            },
            {
                subtitles: "Update book",
                method: "patch",
                link: "http://libraryapi.muhammadrisano.online/book/{id}",
                key: "name,writer,location,categori_id"
            }
        ]
    })
})


module.exports = app

