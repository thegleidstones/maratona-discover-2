const express = require('express')
const server = express()
const routes = require('./routes')
const path = require('path')

// configurando a nossa template engine
server.set('view engine', 'ejs')

// mudar localização da pasta views
server.set('views', path.join(__dirname, 'views'))

//habilitar arquivos estáticos
server.use(express.static('public'))

// user req.body
server.use(express.urlencoded({ extended: true }))

//routes
server.use(routes)

server.listen(3000, () => console.log('rodando'))
