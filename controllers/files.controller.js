const db = require('../database');
const sql = require('../sql-query-generator');
const {v4: uuidv4} = require('uuid');
const fs = require('fs');

module.exports = {
    createFile: (req, res) => {
        let files = [];
        req.files.forEach((file, index) => {
            let newFile = {
                id: uuidv4(),
                createdBy: null,
                fileName: file.filename,
                originalName: file.originalname,
                mime: file.mimetype,
                size: file.size
            }
            db.query(sql.createFile(newFile), (err, response) => {
                if (err) {
                    return res.status(400).json({
                        msg: 'Internal Server Error',
                        err,
                    })
                } else {
                    files.push({
                        ...newFile,
                        uid: newFile.id,
                        url: `/uploads/users/${newFile.fileName}`
                    });
                    if (index === req.files.length - 1) {
                        res.status(201).json(files);
                    }
                }
            })
        })
    },
    createFileByCreatedBy: (req, res) => {
        db.query(sql.getUserById(req.params.createdBy), (err, response) => {
            if (!response || !response.length) {
                res.status(404).json({
                    msg: 'User not found'
                })
            } else {
                let files = [];
                req.files.forEach((file, index) => {
                    let newFile = {
                        id: uuidv4(),
                        createdBy: req.params.createdBy,
                        fileName: file.filename,
                        originalName: file.originalname,
                        mime: file.mimetype,
                        size: file.size
                    }
                    db.query(sql.createFile(newFile), (err, response) => {
                        if (err) {
                            return res.status(400).json({
                                msg: 'Internal Server Error',
                                err,
                            })
                        } else {
                            files.push({
                                ...newFile,
                                uid: newFile.id,
                                url: `/uploads/users/${newFile.id}`
                            });
                            if (index === req.files.length - 1) {
                                res.status(201).json(files);
                            }
                        }
                    })
                })
            }
        })
    },
    deleteFile: async (req, res) => {
        db.query(sql.getFileById(req.params.id), (err, files) => {
            if (err) {
                res.status(500).json({
                    msg: 'Internal Server Error',
                    err,
                })
            } else if (files && files.length) {
                db.query(sql.deleteFileById(req.params.id), (err, response) => {
                    let filePath = __dirname + `/../_uploads/users/${files[0].fileName}`;
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                        res.status(201).json({
                            msg: 'File removed successfully'
                        })
                    } else {
                        res.status(500).json({
                            msg: 'File not fount in cloud'
                        })
                    }
                })
            } else {
                res.status(404).json({
                    msg: 'File not fount'
                })
            }
        })
    }
}
