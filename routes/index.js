var express = require('express');
var router = express.Router();
var fs = require('fs');

//real data
if (!process.env.MOOGSOFT_HOME) {
    process.env.MOOGSOFT_HOME = '/usr/share/moogsoft';
    //process.env.MOOGSOFT_HOME = './test';
}
var configDir = process.env.MOOGSOFT_HOME+"/config/";
var mooBotDir = process.env.MOOGSOFT_HOME+"/bots/moobots";
var lamBotDir = process.env.MOOGSOFT_HOME+"/bots/lambots";
//var initDir = "/etc/init.d/";

console.log('Reading: '+configDir);
var confFiles = fs.readdirSync(configDir);
console.log('Reading: '+mooBotDir);
var mooBotFiles = fs.readdirSync(mooBotDir);
console.log('Reading: '+lamBotDir);
var lamBotFiles = fs.readdirSync(lamBotDir);
//console.log(botFiles);

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Configs and Moobots', mooBotList: mooBotFiles, lamBotList: lamBotFiles, confList: confFiles });
    res.end();
});

module.exports = router;
