# hero

hero-js A simple web server.

## Start

1. `npm install`
2. `npm run dev`

## Router

Create router files in router folder, and use decorators:

```ts
import { get } from '**/Hero'
import { Context } from 'koa'

export default class User {
  @get('/get')
  public async get(ctx: Context) {
    ctx.body = {
      ok: 1,
      data: { name: 'hero' },
    }
  }
}
```

## Api

`Hero.start(port, callback?)`: Create a web server with port.

```js
const server = new Hero()

server.start(3000, console.log.bind(null, 'running in 3000...'))
```

`Hero.use(Koa.Middleware)`: Use middleware of koa.

```js
server.use(bodyParser())
```

`@get(path)`: Create a `GET` router.

`@post(path)`: Create a `POST` router.

`@del(path)`: Create a `DELETE` router.

`@put(path)`: Create a `PUT` router.

`@head(path)`: Create a `HEAD` router.

`@options(path)`: Create a `OPTIONS` router.

`@patch(path)`: Create a `PATCH` router.

## License

MIT
