import { db } from '~~/server/utils/db'
export default defineEventHandler(() => Array.from(db.lists.values()))
