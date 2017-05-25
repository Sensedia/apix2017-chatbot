const Joi = require('joi');
const userController = require('../controllers/api.controller.js');

exports.register = (server, options, next) => {

    server.route({
        method: 'POST',
        path: '/usuarios/{usuarioId}/telefones',
        config: {
            handler: userController.salvarTelefone,
            description: 'Salvar telefone',
            notes: 'Salva o telefone do usuario informado',
            tags: ['api'],
            validate: {
                params: {
                    usuarioId: Joi.number()
                        .required()
                        .description('Identificador do usuario'),
                },
                payload: Joi.object({
                    numero: Joi.string().required()
                })
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/usuarios/{usuarioId}/telefones',
        config: {
            handler: userController.buscarTelefones,
            description: 'Buscar telefones',
            notes: 'Retorna todos os telefones do usuario informado',
            tags: ['api'],
            validate: {
                params: {
                    usuarioId: Joi.number()
                        .required()
                        .description('Identificador do usuario'),
                }
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/usuarios/{usuarioId}/telefones/{telefoneId}',
        config: {
            handler: userController.buscarTelefone,
            description: 'Buscar telefone',
            notes: 'Retorna o telefone com base no identificador e usuario informado',
            tags: ['api'],
            validate: {
                params: {
                    usuarioId: Joi.number()
                        .required()
                        .description('Identificador do usuario'),
                    telefoneId: Joi.string().guid()
                        .required()
                        .description('Identificador do telefone'),
                }
            }
        }
    });

    next();

};

exports.register.attributes = {
    name: 'api',
    version: '1.0.0'
};