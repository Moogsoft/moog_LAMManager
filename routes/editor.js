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
router.get('/', function(req, res, next) {
    fileName = baseDir+'/'+url.parse(req.url,true).query.file;
    console.log('File: '+fileName);
    try {
        editFile = fs.readFileSync(fileName, 'utf8');
    }
    catch (err) {
        console.log('Configuration file read error!: ' + fileName);
        next(err);
        return;
    }
    //console.log(editFile);
    res.render('editor', { title: 'File Editor '+fileName, editFile: editFile });
    res.end();
});

router.post('/', function(req, res, next) {
    console.log('POST to editor');
    var saveFile = req.body.postFile;
    var shortName = fileName.split('/').pop();
    console.log('Got Data for '+req.body.fileName);

    //console.log(saveFile);
    try {
        fs.writeFileSync(fileName,saveFile);
        console.log('File saved');
        res.status(200);
        res.send(shortName+" Saved OK");
    }
    catch(err) {
        //Send an error
        console.log(err);
        next(err);
    }
});

module.exports = router;
