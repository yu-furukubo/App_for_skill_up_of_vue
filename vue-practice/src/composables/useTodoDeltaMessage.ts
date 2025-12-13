import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import type { useMultiTodoStore } from '@/stores/multiTodo';

type Store = ReturnType<typeof useMultiTodoStore>;

const lastDeltaMsg = ref<string | null>(null);
let initialized = false;

export function initTodoDeltaMessage(store: Store) {
  if (initialized) return;
  initialized = true;

  const { remainingMap, lists } = storeToRefs(store);

  watch(remainingMap, (nv, ov) => {
    if (!ov) return;

    for (const id of Object.keys(nv)) {
      const nid = Number(id);
      const diff = (nv[nid] ?? 0) - (ov[nid] ?? 0);
      if (diff === 0) continue;

      const listName = lists.value[nid]?.name ?? `List${nid}`;
      lastDeltaMsg.value =
        diff > 0
          ? `${listName} の未完了が ${diff} 件増加`
          : `${listName} の未完了が ${-diff} 件減少`;
    }
  });
}

export function useTodoDeltaMessage() {
  return { lastDeltaMsg };
}
