var express = require('express');
var router = express.Router();
var logger = require('morgan');
var fs = require('fs');
var url = require('url');

var editFile = {};
var fileName = '';
if (!process.env.MOOGSOFT_HOME) {
    process.env.MOOGSOFT_HOME = '/usr/share/moogsoft';
}
var baseDir = process.env.MOOGSOFT_HOME;

/* GET home page. */
router.get('/', function(req, res) {
    fileName = baseDir+'/'+url.parse(req.url,true).query.file;
    console.log('File: '+fileName);
    try {
        editFile = fs.readFileSync(fileName, 'utf8');
    }
    catch (err) {
        console.log('Configuration file read error!: ' + fileName);
        return;
    }
    //console.log(editFile);
    res.render('editor', { title: 'File Editor '+fileName, editFile: editFile });
});

router.post('/', function(req, res, next) {
    var saveFile = req.body.postFile;
    console.log('Got Data');
    console.log(saveFile);
    try {
        fs.writeFileSync(fileName,saveFile);
        console.log('File saved');
        res.status(200);
        res.send("File Saved OK");
        //send 200 OK
    }
    catch(err) {
        //Send an error
        console.log(err);
    }
    //next();
});

module.exports = router;
