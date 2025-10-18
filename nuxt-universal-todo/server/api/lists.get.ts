import { prisma } from '../utils/prisma' // ルートからの相対に調整（例: '../utils/prisma'）

export default defineEventHandler(async () => {
  return prisma.list.findMany({
    include: { todos: true },
    orderBy: { id: 'asc' },
  })
})
