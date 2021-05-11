import { DeepReadonly } from "vue";

export interface Todo {
  id: number;
  title: string;
  description: string;
  isDone: boolean;
}

export interface TodoState {
  todos: Todo[];
}

export type Params = Pick<Todo, "title" | "description" | "isDone">;

export interface TodoStore {
  state: DeepReadonly<TodoState>;
  fetchTodos: () => void;
  fetchTodo: (id: number) => void;
  getTodo: (id: number) => Todo;
  addTodo: (todo: Params) => void;
  updateTodo: (id: number, todo: Todo) => void;
  deleteTodo: (id: number) => void;
}
