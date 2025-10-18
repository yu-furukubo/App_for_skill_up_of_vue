export async function createList(name: string): Promise<{ id: number; name: string }> {
  // 本番では fetch/axios へ差し替え
  return { id: Date.now(), name }
}
