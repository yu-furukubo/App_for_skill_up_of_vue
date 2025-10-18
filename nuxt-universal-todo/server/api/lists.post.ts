import { db } from '~~/server/utils/db'
export default defineEventHandler(async (e) => {
  const body = await readBody<{ name: string }>(e)
  const id = db.nextListId++
  const list = { id, name: body?.name ?? `List ${id}`, todos: [] }
  db.lists.set(id, list)
  return list
})
