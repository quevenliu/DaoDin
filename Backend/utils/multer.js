const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/img/profile');
    }
});

const upload = multer({ storage: storage });

module.exports = upload;