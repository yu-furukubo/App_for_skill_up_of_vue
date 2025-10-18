import { prisma } from '../../../utils/prisma'

export default defineEventHandler(async (e) => {
  const id = Number(getRouterParam(e, 'id'))
  const body = await readBody<{ title?: string }>(e)
  const title = body?.title?.trim()
  if (!title) { setResponseStatus(e, 400); return { error: 'title required' } }

  const created = await prisma.todo.create({ data: { title, listId: id } })
  return created
})
