const validator = require('validator');
const statusList = ['client', 'demo', 'lead']

module.exports = (req, res, next) => {
    let error = {};
    if (validator.isEmpty(req.body.firstName) || !validator.isLength(req.body.firstName, {min: 3, max: 50})) {
        error.firstName = 'Invalid First Name';
    }
    if (validator.isEmpty(req.body.lastName) || !validator.isLength(req.body.lastName, {min: 3, max: 50})) {
        error.lastName = 'Invalid Last Name';
    }
    if (validator.isEmpty(req.body.email) || !validator.isEmail(req.body.email) || !validator.isLength(req.body.email, {
        min: 3,
        max: 100
    })) {
        error.email = 'Invalid Email';
    }
    if (validator.isEmpty(req.body.status) || !statusList.includes(req.body.status)) {
        error.status = 'Invalid status';
    }
    if (validator.isEmpty(req.body.birthDate) || !validator.isDate(req.body.birthDate, ['-'])) {
        error.birthDate = 'Invalid Birth Date';
    }

    if (Object.values(error).length) {
        res.status(400).json(error);
    } else {
        next();
    }
};
