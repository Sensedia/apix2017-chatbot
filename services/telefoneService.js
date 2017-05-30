const db = require('../dao/database');
const uuid = require('uuid/v4');

function salvarTelefone(usuarioId, numero) {
    const novoTelefone = { usuarioId: usuarioId, telefoneId: uuid(), numero: numero };
    return db.insert(novoTelefone);
}

function buscarTelefone(usuarioId, telefoneId) {
    const telefoneDB = db.findObject({ usuarioId: usuarioId, telefoneId: telefoneId });

    if (telefoneDB) {
        return _processarTelefone(telefoneDB);
    }

    return telefoneDB;
}

function buscarTelefones(usuarioId) {
    const telefonesDB = db.find({ usuarioId: usuarioId });
    return _processarTelefones(telefonesDB);
}

function _processarTelefones(telefonesDB) {
    return telefonesDB.map(t => { return { id: t.telefoneId, numero: t.numero }; });
}

function _processarTelefone(telefoneDB) {
    return { numero: telefoneDB.numero };
}

module.exports = {
    salvarTelefone: salvarTelefone,
    buscarTelefone: buscarTelefone,
    buscarTelefones: buscarTelefones
}