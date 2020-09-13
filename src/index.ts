import Hero from '../hero'

const server = new Hero()

server.start(3000, console.log.bind(null, 'running in 3000...'))
