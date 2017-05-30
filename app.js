'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');
const server = new Hapi.Server();

server.connection({
    port: process.env.PORT || 3000
});

const basePath = '/api/v1';

server.register(
    {
        register: require('./routers/telefoneRouter.js')
    }, {
        routes: {
            prefix: basePath
        }
    },
    err => {

        if (err) {
            throw err;
        }

        server.start(() => console.log(`Servidor de pé rodando... URI: ${server.info.uri}`))

    }
);

server.register([
    Inert,
    Vision,
    {
        register: HapiSwagger,
        options: {
            basePath: basePath,
            info: {
                title: Pack.description,
                version: Pack.version,
                contact: {
                    name: Pack.author.name,
                    email: Pack.author.email,
                    url: Pack.author.url
                }
            }
        }
    }]);
