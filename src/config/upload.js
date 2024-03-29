const multer = require('multer');
const path = require('path');

module.exports = {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname,'..', '..', 'uploads'),
    filename: (req, file, callBack) => {
      const extension = path.extname(file.originalname);
      const name = path.basename(file.originalname, extension);

      callBack(null, `${name}-${Date.now()}${extension}`);
    },
  }),
};