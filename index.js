const mongoose = require('mongoose');
const File = require('./models/File');

mongoose.connect('mongodb://localhost:27017/file-info', {useNewUrlParser: true, useUnifiedTopology: true});

const express = require('express');
const app = express();

var cors = require('cors')
 
app.use(cors())

const port = 3012;

app.set('view engine','ejs')
app.set('views','./views')

var multer  = require('multer');
var upload = multer({ dest: 'static/' });

app.use('/static' , express.static('./static'));

app.post('/upload', upload.single('incomingFile'), async(req,res) => {
    console.log('This is the file:', req.file);

    await File.create({
        fieldname: req.file.fieldname,
        originalname: req.file.originalname,
        encoding: req.file.encoding,
        mimetype: req.file.mimetype,
        filename: req.file.filename,
        path: req.file.path,
        size: req.file.size,
    });

    res.send({message: 'File uploaded'});
});

app.get('/upload', async(req,res) =>{
    const uploads = await File.find();

    res.render('upload',{
        upload: uploads
    })
})

app.get('/allfiles', async(req,res) =>{
    const allfiles = await File.find();
    res.json(allfiles);
})

app.listen(port, () => {
    console.log('App is listening at ' + port);
});