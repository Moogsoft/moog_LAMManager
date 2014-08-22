var express = require('express');
var router = express.Router();
//demo data
var lamList = [{name:"Socket LAM",config:"socketlam.conf",bot:"socketlam.js"},{name:"Logfile LAM",config:"logfilelam.conf",bot:"logfilelam.js"}];
var confList = [{name:"Moogfarmd",config:"moog_farmd.conf"},{name:"Mooms",config:"moomsd.conf"}];


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Configs and Moobots', lamlist: lamList, conflist: confList });
});

module.exports = router;
