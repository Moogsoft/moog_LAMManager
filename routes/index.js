var express = require('express');
var router = express.Router();
var fs = require('fs');

//demo data
var lamList = [{name:"Socket LAM",config:"socketlam.conf",bot:"socketlam.js"},{name:"Logfile LAM",config:"logfilelam.conf",bot:"logfilelam.js"}];
var confList = [{name:"Moogfarmd",config:"moog_farmd.conf"},{name:"Mooms",config:"moomsd.conf"}];

//real data
if (!process.env.MOOGSOFT_HOME) {
    process.env.MOOGSOFT_HOME = '/usr/share/moogsoft';
}
var configDir = process.env.MOOGSOFT_HOME+"/config/";
var botDir = process.env.MOOGSOFT_HOME+"/moobots/";
console.log(botDir);
var confFiles = fs.readdirSync(configDir);
var botFiles = fs.readdirSync(botDir);

console.log(botFiles);


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Configs and Moobots', lamlist: lamList, conflist: confList });
});

module.exports = router;
