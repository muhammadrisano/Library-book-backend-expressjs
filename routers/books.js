const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
var cors = require('cors');
var whitelist = ['http://36.90.16.135', 'http://localhost']
var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
}

router.get('/', cors(corsOptionsDelegate), (req, res) => {
    const categori = req.query.id_category;
    const location = req.query.location;
    const search = req.query.search;
    console.log(categori)
    let where = "";
    if (categori) {
        where = ` WHERE book_manager.id_category = '${categori}'`;
    } else if (location) {
        where = ` WHERE book_manager.location = '${location}'`;
    } else if (search) {
        where = ` WHERE book_manager.location like '%${search}%' OR category.name_category like '%${search}%'`;
    }


    conn.query("SELECT id_book, name, writer, location, name_category, created_at, updated_at FROM book_manager INNER JOIN category ON book_manager.id_category = category.id_category" + where, (err, result) => {
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
router.get('/:id_book', cors(corsOptionsDelegate), (req, res) => {
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
router.post('/', cors(corsOptionsDelegate), (req, res) => {
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
        res.status(200).json({
            succes: true,
            status: 200,
            message: "data success created !!"
        })
    })
})
router.patch('/:id_book', cors(corsOptionsDelegate), (req, res) => {
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
        res.status(200).json({
            succes: true,
            status: 200,
            message: "data success updated !!"
        })
    })
})
router.delete('/:id_book', cors(corsOptionsDelegate), (req, res) => {
    id = req.params.id_book;
    console.log(id);
    conn.query('DELETE FROM book_manager WHERE id_book= ?', id, (err, result) => {
        if (err) console.log(err);

        res.status(200).json({
            succes: true,
            status: 200,
            message: "data success deleted !!"
        })
    })
})

module.exports = router;