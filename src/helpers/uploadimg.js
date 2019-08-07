const multer = require('multer');
const upload = multer({ dest: 'uploads/' })

module.exports = {

    uploadimage: () => {
        upload.single('image')

    }
}