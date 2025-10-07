import { ref, computed } from 'vue';

export type Todo = { id: number; title: string; done: boolean };

export function useTodos(initial: Todo[] = []) {
  const todos = ref<Todo[]>(initial);

  const nextId = computed(() =>
    todos.value.length ? Math.max(...todos.value.map((t) => t.id)) + 1 : 1
  );

  function addTodo(title: string) {
    const t = title.trim();
    if (!t) return;
    todos.value.push({ id: nextId.value, title: t, done: false });
  }

  function toggleTodo(id: number) {
    const todo = todos.value.find((t) => t.id === id);
    if (todo) todo.done = !todo.done;
  }

  function removeTodo(id: number) {
    todos.value = todos.value.filter((t) => t.id !== id);
  }
  return { todos, nextId, addTodo, toggleTodo, removeTodo };
}
