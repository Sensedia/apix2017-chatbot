const Boom = require('boom');
const HttpStatus = require('http-status');
const telefoneService = require('../services/telefoneService');

function salvarTelefone(req, reply) {
    const { usuarioId } = req.params;
    const { numero } = req.payload;
    const novoTelefone = telefoneService.salvarTelefone(usuarioId, numero);
    reply({ id: novoTelefone.telefoneId }).header('Location', `usuarios/${novoTelefone.usuarioId}/telefones/${novoTelefone.telefoneId}`).code(HttpStatus.CREATED);
}

function buscarTelefone(req, reply) {
    const { usuarioId, telefoneId } = req.params;
    const telefone = telefoneService.buscarTelefone(usuarioId, telefoneId);

    if (!telefone) {
        return reply(Boom.notFound('Identificador inexistente'));
    }

    reply(telefone);
}

function buscarTelefones(req, reply) {
    const { usuarioId } = req.params;
    const telefones = telefoneService.buscarTelefones(usuarioId);
    reply(telefones);
}

module.exports = {
    salvarTelefone: salvarTelefone,
    buscarTelefone: buscarTelefone,
    buscarTelefones: buscarTelefones
}