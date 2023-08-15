const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.env.UPLOAD_PATH);
    }
});

const upload = multer({ storage: storage });

module.exports = upload;