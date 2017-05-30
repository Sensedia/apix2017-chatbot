const loki = require('lokijs');
const db = new loki('loki.json');
const telefonesDB = db.addCollection('telefones');

module.exports = telefonesDB;