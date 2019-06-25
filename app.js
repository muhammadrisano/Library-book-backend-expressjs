require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.SERVER_PORT;
const mysql = require('mysql');
const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res) => {
    const categori = req.query.id_category
    const location = req.query.location;
    console.log(categori)
    // let where = "";
    if (categori) {
        conn.query("SELECT id_book, name, writer, location, name_category, created_at, updated_at FROM book_manager INNER JOIN category ON book_manager.id_category = category.id_category WHERE book_manager.id_category=?", categori, (err, result) => {
            if (err) console.log(err);
            res.json(result);
        })
    } else if (location) {
        conn.query("SELECT id_book, name, writer, location, name_category, created_at, updated_at FROM book_manager INNER JOIN category ON book_manager.id_category = category.id_category WHERE book_manager.location=?", location, (err, result) => {
            if (err) console.log(err);
            res.json(result);
        })
    } else {
        conn.query("SELECT id_book, name, writer, location, name_category, created_at, updated_at FROM book_manager INNER JOIN category ON book_manager.id_category = category.id_category", (err, result) => {
            // if (err) {
            //     req.status(404).json({
            //         succes: false,
            //         status: 404,
            //         message: "Data Not Found"
            //     })
            // } else {

            res.status(200).json({
                succes: true,
                status: 200,
                result: result
            })
            // }
        })
    }


})
app.get('/:id_book', (req, res) => {
    id = req.params.id_book;
    // console.log(id)
    // if (id) {
    conn.query('SELECT id_book, name, writer, location, name_category, created_at, updated_at FROM book_manager INNER JOIN category ON book_manager.id_category = category.id_category WHERE id_book=?', id, (err, result) => {
        if (err) console.log(err);

        if (result.length > 0) {
            res.status(200).json({
                succes: true,
                status: 200,
                result: result
            })
        } else {
            res.status(404).json({
                succes: false,
                status: 404,
                message: "Data Not Found"
            })
        }
    })

})
app.post('/', (req, res) => {
    const { name, writer, location, id_category } = req.body;
    const data = {
        name,
        writer,
        location,
        id_category,
        created_at: new Date(),
        updated_at: new Date()
    }
    conn.query('INSERT INTO book_manager SET ?', data, (err, result) => {
        if (err) console.log(err);
        res.json(result);
    })
})
app.patch('/:id_book', (req, res) => {
    const { name, writer, location, id_category } = req.body;
    const id = req.params.id_book;
    const data = {
        name,
        writer,
        location,
        id_category,
        updated_at: new Date()
    }
    conn.query('UPDATE book_manager SET ? WHERE id_book=?', [data, id], (err, result) => {
        if (err) console.log(err);
        res.json(result);
    })
})
app.delete('/:id_book', (req, res) => {
    id = req.params.id_book;
    console.log(id);
    conn.query('DELETE FROM book_manager WHERE id_book= ?', id, (err, result) => {
        if (err) console.log(err);

        res.json(result);
    })
})

app.listen(port, () => {
    console.log(`\n App Listen post ${port}`);
})