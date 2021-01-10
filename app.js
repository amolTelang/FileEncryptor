const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
const encryptor = require('file-encryptor'); 



// Set The Storage Engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb){
    cb(null,file.originalname);
  }
});

// Init Upload
const upload = multer({
  storage: storage
}).single('file');

// Init app
const app = express();

// EJS
app.set('view engine', 'ejs');

// Public Folder
app.use(express.static('./public'));

app.get('/', (req, res) => res.render('index'));

app.post('/encrypt', (req, res) => {
  upload(req, res, (err) => {
    if(err){
      res.render('index', {
        msg: err
      });
    } else {
      if(req.file == undefined){
        res.render('index', {
          msg: 'Error: No File Selected!'
        });
      } else {
        res.render('index', {
          msg: 'File encrypted!',
          file: `uploads/${req.file.filename}`
        });
      }
    }
  });
});

app.post('/decrypt', (req, res) => {
    upload(req, res, (err) => {
      if(err){
        res.render('index', {
          msg: err
        });
      } else {
        if(req.file == undefined){
          res.render('index', {
            msg: 'Error: No File Selected!'
          });
        } else {
          res.render('index', {
            msg: 'File decrypted!',
            file: `uploads/${req.file.filename}`
          });
        }
      }
    });
  });

const port = 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));