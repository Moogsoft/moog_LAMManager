var express = require('express');
var router = express.Router();
var fs = require('fs');

//real data
if (!process.env.MOOGSOFT_HOME) {
    //process.env.MOOGSOFT_HOME = '/usr/share/moogsoft';
    process.env.MOOGSOFT_HOME = './test';
}
var configDir = process.env.MOOGSOFT_HOME+"/config/";
var mooBotDir = process.env.MOOGSOFT_HOME+"/bots/moobots";
var lamBotDir = process.env.MOOGSOFT_HOME+"/bots/lambots";
var fileList;
//var initDir = "/etc/init.d/";

console.log('Reading: '+configDir);
try {
    fileList = fs.readdirSync(configDir);
    var confFiles = fileList.filter(fn => !fn.startsWith('.'));
} catch(e) {
    console.log('Config directory error '+e.code);
    confFiles = '';
}

console.log('Reading: '+mooBotDir);
try {
    fileList = fs.readdirSync(mooBotDir);
    var mooBotFiles = fileList.filter(fn => !fn.startsWith('.'));
} catch(e) {
    console.log('Moobot directory error '+e.code);
    mooBotFiles = '';
}
console.log('Reading: '+lamBotDir);
try {
    var fileList = fs.readdirSync(lamBotDir);
    var lamBotFiles = fileList.filter(fn => !fn.startsWith('.'));
} catch(e) {
    console.log('Lambot directory error '+e.code);
    lamBotFiles = '';
}

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Configs and Moobots', mooBotList: mooBotFiles, lamBotList: lamBotFiles, confList: confFiles });
    res.end();
});

module.exports = router;
