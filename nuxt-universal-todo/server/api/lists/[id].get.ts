import { db } from '~~/server/utils/db'
export default defineEventHandler((e) => {
  const id = Number(getRouterParam(e, 'id'))
  return db.lists.get(id) ?? null
})
