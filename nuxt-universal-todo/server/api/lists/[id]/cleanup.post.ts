import { prisma } from '../../../utils/prisma'

export default defineEventHandler(async (e) => {
  const id = Number(getRouterParam(e, 'id'))
  await prisma.todo.deleteMany({ where: { listId: id, done: true } })
  return { ok: true }
})
