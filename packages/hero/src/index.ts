import * as Koa from 'koa'
import { resolve } from 'path'
import { type Server } from 'http'
import * as KoaRouter from 'koa-router'
import { resolveRouter } from './router'
import * as KoaStatic from 'koa-static'
import * as KoaBodyParser from 'koa-bodyparser'
import config from './config'
export { Context } from 'koa'

export const Router = class Router extends KoaRouter {}

interface ApplicationOptions {
  routerPath?: string
}

export default class Application {
  public app: Koa
  public routerPath: string
  constructor({ routerPath }: ApplicationOptions = {}) {
    const app = new Koa()
    this.app = app
    this.routerPath = routerPath || config.routerPath
  }
  start(port: number, callbacks?: () => void): Server {
    const routerPath = resolve(require.main!.path, this.routerPath)
    const routes = resolveRouter(routerPath).routes()
    this.app.use(KoaBodyParser())
    this.app.use(routes)
    return this.app.listen(port, callbacks)
  }
  static(root: string, options?: KoaStatic.Options): Koa {
    return this.app.use(KoaStatic(root, options))
  }
  use(middleware: Koa.Middleware): Koa {
    return this.app.use(middleware)
  }
}

export * from './router'
