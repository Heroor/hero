import { Context } from 'koa'
import { get } from '../../hero'

const data = [
  {
    name: 'ben',
    age: 12,
  },
]

export default class User {
  @get('/get')
  public async get(ctx: Context) {
    ctx.body = {
      ok: 1,
      data: data,
    }
  }
  @get('/add')
  public async add(ctx: Context) {
    const name = ctx.URL.searchParams.get('name')
    const age = +ctx.URL.searchParams.get('age')
    data.push({
      name,
      age,
    })
    ctx.body = {
      ok: 1,
    }
  }
  @get('/del')
  public async del(ctx: Context) {
    const name = ctx.URL.searchParams.get('name')

    const i = data.findIndex((item) => item.name === name)
    if (i > -1) {
      data.splice(i, 1)
      ctx.body = {
        ok: 1,
      }
    } else {
      ctx.body = {
        ok: 0,
        errMsg: 'not find',
      }
    }
  }
}
