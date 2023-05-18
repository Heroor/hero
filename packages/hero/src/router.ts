import * as KoaRouter from 'koa-router'
import { join } from 'path'
import { glob } from 'glob'

const router = new KoaRouter()

type Methods = 'get' | 'post' | 'delete' | 'put' | 'head' | 'options' | 'patch'
type RouterDecorator = (path: string) => MethodDecorator
type RouterMethod = (method: Methods) => RouterDecorator

export const method: RouterMethod =
  method => path => (target: object, property: string | symbol) => {
    router[method](path, Reflect.get(target, property))
    return {
      value: Reflect.get(target, property),
    }
  }

export const get = method('get')
export const post = method('post')
export const del = method('delete')
export const put = method('put')
export const head = method('head')
export const options = method('options')
export const patch = method('patch')

export function resolveRouter(path: string) {
  const dir = join(path + '/**/*.{ts,js}')
  glob.sync(dir).forEach(require)
  return router
}
