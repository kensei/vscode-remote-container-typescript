import { TodoClient } from "@/repositories/todoClient";
import { TodoClientInterface } from "@/repositories/todoClient/types";

export const TODOS = "todos";

export interface Repositories {
  [TODOS]: TodoClientInterface;
}

export default {
  [TODOS]: new TodoClient(),
} as Repositories;
