import { TodoClient } from "@/storages/todoClient";
import { TodoApiClient } from "@/storages/todoClient/api";
import { TodoClientInterface } from "@/storages/todoClient/types";

export const TODOS = "todos";

export interface Repositories {
  [TODOS]: TodoClientInterface;
}

export default {
  [TODOS]:
    process.env.NODE_ENV === "api" ? new TodoApiClient() : new TodoClient(),
} as Repositories;
