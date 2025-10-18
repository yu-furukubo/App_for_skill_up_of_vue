import { db } from '~~/server/utils/db'
export default defineEventHandler(async (e) => {
  const id = Number(getRouterParam(e, 'id'))
  const list = db.lists.get(id)
  if (!list) { setResponseStatus(e, 404); return { error: 'list not found' } }

  const body = await readBody<{ title: string }>(e)
  const todoId = db.nextTodoId++
  list.todos.push({ id: todoId, title: body?.title ?? `todo ${todoId}`, done: false })
  return list
})
