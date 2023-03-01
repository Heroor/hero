# Hero

A light web server framework base Koa.

## Install

```bath
npm install @heroor/hero
```

```bath
yarn add @heroor/hero
```

```bath
pnpm install @heroor/hero
```

## Usage

### Create

```ts
// index.ts
import Hero from '@heroor/hero'

const server = new Hero()
server.start(3000, console.log.bind(0, 'Server is running: http://localhost:3000/'))
```

### Convention Routing

Create router files in `router/` folder, use decorators and export a `Class`:

```
└── src
  ├── index.ts
  └── router
    └── user.ts  <--- here!
```

```ts
// router/user.ts
import { get, Context } from '@heroor/hero'

export default class User {
  @get('/get/user')
  public async getUser(ctx: Context) {
    ctx.body = {
      ok: 1,
      data: { name: 'hero' },
    }
  }
}
```

## APIs

### `Hero.start()`

Create a web server by port.

`Hero.start(port, callback?)`

```ts
const server = new Hero()
server.start(3000, console.log.bind(null, 'Running in 3000...'))
```

### `Hero.static()`

Create a static server by path.

`Hero.static(path, options?)`

```ts
const server = new Hero()
server.static(resolve(__dirname, './public'))
```

### `Hero.use()`

Use middleware of koa.

`Hero.use(Koa.Middleware)`

```js
const server = new Hero()
server.use(bodyParser())
```

### Router decorators

- `@get(path)`: Create a `GET` router.
- `@post(path)`: Create a `POST` router.
- `@del(path)`: Create a `DELETE` router.
- `@put(path)`: Create a `PUT` router.
- `@head(path)`: Create a `HEAD` router.
- `@options(path)`: Create a `OPTIONS` router.
- `@patch(path)`: Create a `PATCH` router.


```ts
// router/user.ts
import { get, post, Context } from '@heroor/hero'

export default class User {
  @get('/get/user')
  public async getUser(ctx: Context) {
    // ...
  }
  @post('/create/user')
  public async createUser(ctx: Context) {
    // ...
  }
}
```

## License

MIT
