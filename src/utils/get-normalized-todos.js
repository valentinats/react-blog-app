export function getNormalizedTodos(todosList) {
  const ids = [];
  const byIds = {};

  todosList.forEach((todo) => {
    const id = todo.id;

    if (!ids.includes(id)) {
      ids.push(id);
      byIds[id] = todo;
    }
  });
  return [ids, byIds];
}
