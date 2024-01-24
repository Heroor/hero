import { get, post, del, Context } from '@heroor/hero'

type dataType = {
  id: number
  name: string
  age: number
}

let ID = 1

const data = [
  {
    id: ID,
    name: 'Hero',
    age: 12,
  },
]

export default class User {
  @get('/getUser')
  public async get(ctx: Context) {
    const { id } = ctx.query
    if (id) {
      ctx.body = data.find(item => item.id === +id) || { ok: 1, data: null }
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
      data.push({ name, age, id: ++ID })
      ctx.body = {
        ok: 1,
      }
    } else {
      ctx.body = {
        ok: 0,
        errMsg: 'Params error',
      }
    }
  }

  @del('/deleteUser')
  public async delete(ctx: Context) {
    const { id } = ctx.request.body as dataType
    const i = data.findIndex(item => item.id === id)
    if (i > -1) {
      data.splice(i, 1)
      ctx.body = {
        ok: 1,
      }
    } else {
      ctx.body = {
        ok: 0,
        errMsg: 'Not find',
      }
    }
  }
}
