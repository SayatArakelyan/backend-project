const express = require('express');
const router = express.Router();
const controller = require('../controllers/users.controller');
const validateUser = require('../validators/users.validator');

router.get('/', controller.getUsers);
router.get('/:id', controller.getUserById);

router.post('/', validateUser, controller.createUser);

router.put('/:id', controller.editUser);

router.delete('/:id', controller.deleteUser);

module.exports = router;
