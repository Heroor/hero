import Hero from '@heroor/hero'
import { resolve } from 'path'
const server = new Hero()

console.log(Hero)

server.static(resolve(__dirname, './public'))
server.start(
  3000,
  console.log.bind(0, 'Server is running: http://localhost:3000/'),
)
