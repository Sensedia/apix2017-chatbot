const loki = require('lokijs');
const db = new loki('loki.json');
const ibge = db.addCollection('ibge');

module.exports = ibge;