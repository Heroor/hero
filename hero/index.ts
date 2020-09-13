import * as Koa from 'koa'
import { Server } from 'http'
import { resolve } from 'path'
import * as KoaRouter from 'koa-router'
import { resolveRouter } from './router'
import config from './config'

export const Router = class Router extends KoaRouter {}

export default class Application {
  public app: Koa
  constructor() {
    const app = new Koa()
    this.app = app
  }
  start(port, callbacks?): Server {
    const routerPath = resolve(process.cwd(), config.routerPath)
    const routes = resolveRouter(routerPath).routes()
    this.app.use(routes)
    return this.app.listen(port, callbacks)
  }
  use(middleware: Koa.Middleware): Koa {
    return this.app.use(middleware)
  }
}

export * from './router'
