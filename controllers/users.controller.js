const db = require('../database');
const sql = require('../sql-query-generator');
const {v4: uuidv4} = require('uuid');

module.exports = {
    getUsers: async (req, res) => {
        db.query(sql.getAllUsers(req.query), (err, data) => {
            if (err) {
                res.status(500).json({
                    msg: 'Failure Get Users',
                    err
                })
            } else {
                res.status(201).json(data)
            }
        })
    },
    getUserById: async (req, res) => {
        db.query(sql.getUserById(req.params.id), (err, users) => {
            if (users && users.length) {
                db.query(sql.getAllUserFilesByUserId(req.params.id), (err, response) => {
                    if (err) {
                        res.status(500).json({
                            msg: 'Internal Server Error',
                            err
                        })
                    } else {
                        res.status(200).json({
                            ...users[0],
                            files: [
                                ...response.map(file => {
                                    file.url = `/uploads/users/${file.fileName}`
                                    file.uid = file.id
                                    return file
                                })
                            ]
                        })
                    }
                })
            } else {
                res.status(404).json({
                    msg: 'User not found'
                })
            }
        })
    },
    createUser: async (req, res) => {
        let newUser = {
            id: uuidv4(),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            birthDate: req.body.birthDate,
            ipAddress: req.body.ipAddress,
            status: req.body.status
        }
        db.query(sql.getUserByFiled('email', newUser.email), (err, response) => {
            if (!response || !response.length) {
                db.query(sql.createUser(newUser), (err, response) => {
                    if (err) {
                        res.status(500).json({
                            msg: 'Internal Server Error',
                            err
                        });
                    } else if (response) {
                        if (req.body.fileIds.length) {
                            req.body.fileIds.forEach((id, index) => {
                                db.query(sql.editFileById(id, newUser.id), (err, response) => {
                                    if (err) {
                                        res.status(500).json({
                                            msg: 'Internal Server Error',
                                            err
                                        });
                                    } else if (index === req.body.fileIds.length - 1) {
                                        db.query(sql.deleteEmptyFiles(), (err, response) => {
                                            if (err) {
                                                res.status(500).json({
                                                    msg: 'Internal Server Error',
                                                    err
                                                });
                                            } else {
                                                res.status(201).json(newUser);
                                            }
                                        })
                                    }
                                })
                            })
                        } else {
                            res.status(201).json(newUser);
                        }
                    }
                })
            } else {
                res.status(409).json({
                    msg: 'User with this email is already exist'
                })
            }
        });
    },
    editUser: async (req, res) => {
        db.query(sql.getUserById(req.params.id), (err, user) => {
            if (user && user.length) {
                db.query(sql.editUserById(req.params.id, req.body), (err, response) => {
                    if (err) {
                        res.status(500).json({
                            msg: 'Internal Server Error',
                            err
                        });
                    } else {
                        res.status(201).json({
                            ...user[0],
                            ...req.body
                        });
                    }
                })
            } else {
                res.status(404).json({
                    msg: 'User not found'
                })
            }
        })
    },
    deleteUser: async (req, res) => {
        db.query(sql.getUserById(req.params.id), (err, response) => {
            if (response && response.length) {
                db.query(sql.deleteUserById(req.params.id), (err, response) => {
                    if (err) {
                        res.status(500).json({
                            msg: 'Internal Server Error',
                            err
                        })
                    } else {
                        res.status(200).json({
                            msg: 'User Deleted Successfully'
                        })
                    }
                })
            } else {
                res.status(404).json({
                    msg: 'User not found'
                })
            }
        })
    }
}
