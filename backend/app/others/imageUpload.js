// imageUpload.js

const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images/dishes');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage }).single('image');

router.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.status(400).send({
                message: 'Error uploading image',
                error: err,
            });
        } else {
            // Check if the name parameter is provided
            if (req.body.name) {
                const fileExtension = path.extname(req.file.originalname);
                const customFileName = req.body.name + fileExtension;

                // Rename the file
                const fs = require('fs');
                fs.rename(
                    './images/dishes/' + req.file.filename,
                    './images/dishes/' + customFileName,
                    (renameErr) => {
                        if (renameErr) {
                            res.status(400).send({
                                message: 'Error renaming file',
                                error: renameErr,
                            });
                        } else {
                            req.file.filename = customFileName;
                            res.json({
                                message: 'Image uploaded successfully',
                                imageName: customFileName,
                                file: req.file,
                            });
                        }
                    }
                );
            } else {
                res.json({
                    message: 'Image uploaded successfully',
                    imageName: req.file.filename,
                    file: req.file,
                });
            }
        }
    });
});

module.exports = router;
