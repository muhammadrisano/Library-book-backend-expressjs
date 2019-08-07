const categoryModel = require('../models/category');
const MiscHelper = require('../helpers/helpers');


module.exports = {
    getCategory: (req, res) => {
        categoryModel.getCategory()
            .then((resultCategory) => {
                const result = resultCategory
                MiscHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error);
            })
    },
    categoryDetail: (req, res) => {
        id_category = req.params.id
        categoryModel.categoryDetail(id_category)
            .then((resultCategory) => {
                const result = resultCategory
                MiscHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error);
            })

    },
    insertCategory: (req, res) => {
        const data = {
            name_category: req.body.name_category
        }
        categoryModel.insertCategory(data)
            .then((resultCategory) => {
                const result = resultCategory
                MiscHelper.response(res, result, 200, data)
            })
            .catch((error) => {
                console.log(error);
            })
    },
    updateCategory: (req, res) => {
        const id_category = req.params.id
        const data = {
            name_category: req.body.name_category
        }
        categoryModel.updateCategory(id_category, data)
            .then((resultCategory) => {
                const result = resultCategory
                MiscHelper.response(res, result, 200, [id_category, data])
            })
            .catch((error) => {
                console.log(error);
            })
    },
    deleteCategory: (req, res) => {
        const id_category = req.params.id
        categoryModel.deleteCategory(id_category)
            .then((resultCategory) => {
                const result = resultCategory
            })
            .catch((error) => {
                console.log(error);
            })
    }
}