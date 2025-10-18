import type { List } from '~~/types/todo'

export const db = {
  lists: new Map<number, List>(),
  nextListId: 1,
  nextTodoId: 1,
}

// 初期データ
if (!db.lists.size) {
  const id = db.nextListId++
  db.lists.set(id, { id, name: 'Inbox', todos: [] })
}
