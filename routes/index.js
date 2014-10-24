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

console.log('Reading: '+configDir);
var confFiles = fs.readdirSync(configDir);
console.log('Reading: '+botDir);
var botFiles = fs.readdirSync(botDir);

//console.log(botFiles);

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Configs and Moobots', botList: botFiles, confList: confFiles });
    res.end();
});

module.exports = router;
