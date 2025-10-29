// 実装は後で本物に差し替える前提（今はダミー）
export async function createList(name: string): Promise<{ id: number; name: string }> {
  // 例えば fetch/axios で POST する想定
  return { id: Date.now(), name }
}
