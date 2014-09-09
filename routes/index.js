var express = require('express');
var router = express.Router();
var fs = require('fs');

//real data
if (!process.env.MOOGSOFT_HOME) {
    process.env.MOOGSOFT_HOME = '/usr/share/moogsoft';
    //process.env.MOOGSOFT_HOME = './test';
}
var configDir = process.env.MOOGSOFT_HOME+"/config/";
var botDir = process.env.MOOGSOFT_HOME+"/moobots/";
//var initDir = "/etc/init.d/";

console.log(botDir);
var confFiles = fs.readdirSync(configDir);
var botFiles = fs.readdirSync(botDir);

console.log(botFiles);


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Configs and Moobots', botList: botFiles, confList: confFiles });
});

module.exports = router;
