const express = require('express');
const router = express.Router();
const controller = require('../controllers/files.controller');
const upload = require('../middlewares/multer');

router.post('/', upload.array('files'), controller.createFile);
router.post('/:createdBy', upload.array('files'), controller.createFileByCreatedBy);
router.delete('/:id', controller.deleteFile);

module.exports = router;
