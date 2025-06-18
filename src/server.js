// Uma opção é usar index, mas server é mais ideal por se tratar de servidor (serverside)
// Node serve para aplicações REST e APIs
// Aplicações HTTP = APIs REST

// COMMONJS é um módulo do Node.js que permite criar servidores HTTP de forma simples e rápida. (require é uma função do Node.js que importa módulos)
// Tive que colocar o type module no package.json para usar import (mas o Node.js já suporta import/export nativamente a partir da versão 12.0.0)

// Para diferenciar libs de terceiros e libs do Node.js.

// HTTP
// - Método http
// - URL

// Stateful e Stateless
// Stateless:  não salva nada em memória e geralmente utiliza dispositivos externos para armazenar informações, mantendo seu funcionamento mesmo após ser reiniciada
// Stateful: depende de informações salvas em memória para funcionar

// Cabeçalhos tanto na req quanto da res são metadados, são informações para que o front-end saiba lidar, como o tipo de conteúdo

// HTTP STATUS CODES
// 100 a 200: informativos
// 200 a 299: sucesso
// 300 a 399: redirecionamento rotas
// 400 a 499: erro do cliente 
// 400 a 599: erro do servidor

import http from 'node:http';
import { routes } from './routes';


const server = http.createServer((req, res) => {
    const { method, url } = req

    const route = routes.find(route => {
        return route.method === method && route.path === url
    })

    if (route) {
        return route.handler(req, res)
    }

    return res.writeHead(404).end()
})

server.listen(3333)