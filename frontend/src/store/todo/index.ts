import { InjectionKey, reactive, readonly } from "vue";
import { Todo, TodoState, TodoStore, Params } from "@/store/todo/types";
import Repository, { TODOS } from "@/repositories/RepositoryFactory";

const TodoRepository = Repository[TODOS];

// リアクティブなデータを宣言
const state = reactive<TodoState>({
  todos: [],
});

const fetchTodos = async (): Promise<void> => {
  state.todos = await TodoRepository.getAll();
};

const fetchTodo = async (id: number): Promise<void> => {
  const todo = await TodoRepository.get(id);
  state.todos.push(todo);
};

// idを指定して一致するTODOを取得
const getTodo = (id: number): Todo => {
  const todo = state.todos.find((todo) => todo.id === id);
  if (!todo) {
    throw new Error(`cannot find todo by id:${id}`);
  }
  return todo;
};

// 新たにTODOを作成
const addTodo = async (todo: Params): Promise<void> => {
  const result = await TodoRepository.create(todo);
  state.todos.push(result);
};

// idを指定して一致するTODOを更新
const updateTodo = async (id: number, todo: Todo): Promise<void> => {
  const result = await TodoRepository.update(id, todo);
  const index = state.todos.findIndex((todo) => todo.id === id);
  if (index === -1) {
    throw new Error(`cannot find todo by id:${id}`);
  }
  state.todos[index] = result;
};

// idを指定して一致TODOを削除
const deleteTodo = async (id: number): Promise<void> => {
  TodoRepository.delete(id);
  state.todos = state.todos.filter((todo) => todo.id !== id);
};

const todoStore: TodoStore = {
  state: readonly(state),
  fetchTodos,
  fetchTodo,
  getTodo,
  addTodo,
  updateTodo,
  deleteTodo,
};

export default todoStore;

// ストアをprovide/injectするために必要なキーを宣言
export const todoKey: InjectionKey<TodoStore> = Symbol("todoKey");
