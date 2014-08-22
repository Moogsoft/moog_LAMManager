var express = require('express');
var router = express.Router();
//demo data
var editFile = {};
editFile.content = "#Comments \n botfile: {\nbotFile\n }, myfile: 'myfile'";
editFile.name = "file name passed";

/* GET home page. */
router.get('/', function(req, res) {
  res.render('editor', { title: 'File Editor', file: editFile });
});

module.exports = router;
