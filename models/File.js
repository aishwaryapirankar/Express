const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    fieldname: 'string',
    originalname: 'string',
    encoding: 'string',
    mimetype: 'string',
    filename: 'string',
    path: 'string',
    size: 'number',
});

const model = mongoose.model('File', schema);

module.exports = model;