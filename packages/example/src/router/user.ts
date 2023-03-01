import { get, post, del, Context } from '@heroor/hero'

type dataType = {
  name: string
  age: number
}

const data = [
  {
    name: 'hero',
    age: 12,
  },
]

export default class User {
  @get('/getUser')
  public async get(ctx: Context) {
    const { name } = ctx.query
    if (name) {
      ctx.body = data.find(item => item.name === name) || { ok: 1, data: null }
    } else {
      ctx.body = {
        ok: 1,
        data,
      }
    }
  }

  @post('/addUser')
  public async add(ctx: Context) {
    const { name, age } = ctx.request.body as dataType
    if (name && Number.isInteger(age)) {
      data.push({ name, age })
      ctx.body = {
        ok: 1,
      }
    } else {
      ctx.body = {
        ok: 0,
        errMsg: 'params error',
      }
    }
  }

  @del('/deleteUser')
  public async delete(ctx: Context) {
    const { name } = ctx.request.body as dataType
    const i = data.findIndex(item => item.name === name)
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
