let lists: { id: number; name: string }[] = []

export async function createList(name: string): Promise<{name: string }> {
  const maxId = lists.length > 0 ? Math.max(...lists.map(l => l.id)) : 0
  const nextId = maxId + 1

  const newList = { id: nextId, name }
  lists.push(newList)
  return { name: newList.name }
}
