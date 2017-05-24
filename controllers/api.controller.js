const db = require('../dao/database');
const uuid = require('uuid/v4');

function salvarTelefone(req, reply) {
    const { usuarioId } = req.params;
    const { ddd, numero } = req.payload;
    const obj = { usuarioId: usuarioId, telefoneId: uuid(), ddd: ddd, numero: numero };
    db.insert(obj);
    reply({ id: obj.telefoneId }).header('Location', `usuarios/${usuarioId}/telefones/${obj.telefoneId}`).code(201);
}

function buscarTelefone(req, reply) {
    const { usuarioId, telefoneId } = req.params;
    const telefoneDB = db.findOne({ usuarioId: usuarioId, telefoneId: telefoneId });

    if (!telefoneDB) {
        reply({ message: `ID '${telefoneDB}' sem registro.` }).code(404);
    }

    const telefones = processarTelefone(telefoneDB);
    reply(telefones).code(200);
}

function buscarTelefones(req, reply) {
    const { usuarioId } = req.params;
    const telefonesDB = db.find({ usuarioId: usuarioId });
    const telefones = processarTelefones(telefonesDB);
    reply(telefones);
}

function processarTelefones(telefonesDB) {
    return telefonesDB.map(t => { return { id: t.telefoneId, ddd: t.ddd, numero: t.numero }; });
}

function processarTelefone(telefoneDB) {
    return { ddd: telefoneDB.ddd, numero: telefoneDB.numero };
}

module.exports = {
    salvarTelefone: salvarTelefone,
    buscarTelefone: buscarTelefone,
    buscarTelefones: buscarTelefones
}