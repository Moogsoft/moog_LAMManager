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
    //editFile = editFile.replace(/\\n/g, '%0A'); //Escape the escapes
    //editFile = editFile.replace(/\\r/g, '%0D'); //Will need to convert them back before save
    //editFile = editFile.replace(/\n/g,'\\n'); //Create newlines in a single text string
    //editFile = editFile.replace(/\t/g,'\\t'); //Create newlines in a single text string
    //editFile = editFile.replace(/\\/g,'\\\\'); //Double escape
    //console.log(editFile);
    //editFile = encodeURIComponent(editFile);
    res.render('editor', { title: 'File Editor '+fileName, editFile: editFile });
});

router.post('/', function(req, res, next) {
    var saveFile = req.body.postFile;
    console.log('Got Data');
    saveFile.replace(/\r\n|\r|\n/g,'\n');
    saveFile = saveFile.replace(/%0A/g, '\\n'); //Recover the escapes
    saveFile = saveFile.replace(/%0D/g, '\\r'); //Convert them back before save
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
