import { ref } from 'vue';
import { createList as apiCreateList } from '@/api/lists';
import type { useMultiTodoStore } from '@/stores/multiTodo';

type Store = ReturnType<typeof useMultiTodoStore>;

export function useRemoteLists(store: Store) {
  const creating = ref(false);
  const error = ref<unknown>(null);

  async function createListRemote(name: string) {
    creating.value = true;
    error.value = null;

    const id = store.nextListId;
    store.lists[id] = { name, todos: [] };
    store.listIds.push(id);

    try {
      await apiCreateList(name);
      return id;
    } catch (e) {
      delete store.lists[id];
      store.listIds = store.listIds.filter((x) => x !== id);

      error.value = e;
      throw e;
    } finally {
      creating.value = false;
    }
  }

  return { createListRemote, creating, error };
}
