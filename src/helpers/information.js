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
                link: "http://libraryapi.muhammadrisano.online/books or http://libraryapi.muhammadrisano.online/books?search=keywords"
            },
            {
                subtitles: "get detail books",
                method: "get",
                link: "http://libraryapi.muhammadrisano.online/books/{id}"
            },
            {
                subtitles: "input new book",
                method: "post",
                link: "http://libraryapi.muhammadrisano.online/books",
                key: "name,writer,location,categori_id"

            },
            {
                subtitles: "Update book",
                method: "patch",
                link: "http://libraryapi.muhammadrisano.online/books/{id}",
                key: "name,writer,location,categori_id"
            },
            {
                subtitles: "Delete book",
                method: "delete",
                link: "http://libraryapi.muhammadrisano.online/books/{id}",
                key: "name,writer,location,categori_id"
            },
            {
                subtitles: "get all category",
                method: "get",
                link: "http://libraryapi.muhammadrisano.online/category "
            },
            {
                subtitles: "get detail category",
                method: "get",
                link: "http://libraryapi.muhammadrisano.online/category/{id}"
            },
            {
                subtitles: "input new category",
                method: "post",
                link: "http://libraryapi.muhammadrisano.online/category",
                key: "name,writer,location,categori_id"

            },
            {
                subtitles: "Update category",
                method: "patch",
                link: "http://libraryapi.muhammadrisano.online/category/{id}",
                key: "name,writer,location,categori_id"
            },
            {
                subtitles: "Delete category",
                method: "delete",
                link: "http://libraryapi.muhammadrisano.online/category/{id}",
                key: "name,writer,location,categori_id"
            }
        ]
    })
})


module.exports = app

