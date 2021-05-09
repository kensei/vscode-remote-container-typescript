import { InjectionKey, reactive, readonly } from "vue";
import { Todo, TodoState, TodoStore, Params } from "@/store/todo/types";

// 永続化の処理を実装していないので、とりあえずモックとしてデータを用意
const mockTodo: Todo[] = [
  {
    id: 1,
    title: "todo1",
    description: "desc1",
    isDone: true,
  },
  {
    id: 2,
    title: "todo2",
    description: "desc2",
    isDone: false,
  },
  {
    id: 3,
    title: "todo3",
    description: "desc3",
    isDone: false,
  },
];

// リアクティブなデータを宣言(仮実装)
const state = reactive<TodoState>({
  todos: mockTodo,
});

// 新たに作成されたTODOの初期化処理の仮実装
const intitializeTodo = (todo: Params) => {
  const date = new Date();
  return {
    id: date.getTime(),
    title: todo.title,
    description: todo.description,
    isDone: todo.isDone,
  } as Todo;
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
const addTodo = (todo: Params): void => {
  state.todos.push(intitializeTodo(todo));
};

// idを指定して一致するTODOを更新
const updateTodo = (id: number, todo: Todo): void => {
  const index = state.todos.findIndex((todo) => todo.id === id);
  if (index === -1) {
    throw new Error(`cannot find todo by id:${id}`);
  }
  state.todos[index] = todo;
};

// idを指定して一致TODOを削除
const deleteTodo = (id: number): void => {
  state.todos = state.todos.filter((todo) => todo.id !== id);
};

const todoStore: TodoStore = {
  state: readonly(state),
  getTodo,
  addTodo,
  updateTodo,
  deleteTodo,
};

export default todoStore;

// ストアをprovide/injectするために必要なキーを宣言
export const todoKey: InjectionKey<TodoStore> = Symbol("todoKey");
