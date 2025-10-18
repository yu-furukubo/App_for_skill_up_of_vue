import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (e) => {
  const id = Number(getRouterParam(e, 'id'))
  if (!Number.isFinite(id)) { setResponseStatus(e, 400); return { error: 'bad id' } }
  const list = await prisma.list.findUnique({
    where: { id },
    include: { todos: true },
  })
  if (!list) { setResponseStatus(e, 404); return { error: 'not found' } }
  return list
})
