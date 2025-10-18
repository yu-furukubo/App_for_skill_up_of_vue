import { prisma } from '../utils/prisma'

export default defineEventHandler(async (e) => {
  const body = await readBody<{ name?: string }>(e)
  const name = body?.name?.trim() || 'Untitled'
  const created = await prisma.list.create({ data: { name } })
  return created
})
