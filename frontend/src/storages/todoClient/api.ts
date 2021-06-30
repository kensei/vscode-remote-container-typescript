import { Todo, Params } from "@/store/todo/types";
import { TodoClientInterface, TodoJsonResponseType } from "./types";
import { BASE_URI, ResponseStatusCode } from "@/config/const";
import axios, { AxiosResponse } from "axios";
import { BaseJsonResponseType } from "@/storages/baseJsonResponseType";

export class TodoApiClient implements TodoClientInterface {
  constructor() {
    axios.defaults.baseURL = BASE_URI;
    axios.defaults.headers = {
      "Content-Type": "application/json",
    };
  }

  async getAll(): Promise<Todo[]> {
    return new Promise((resolve, reject) => {
      axios
        .get("/tasks")
        .then((res) => {
          const parseResponse = this.hendleResponse(
            res
          ) as TodoJsonResponseType[];
          const result = parseResponse.map(this.convartTodo);
          resolve(result);
        })
        .catch((error) => {
          if (error.isAxiosError) {
            reject(new Error(error.response));
          } else {
            reject(new Error(error));
          }
        });
    });
  }

  async get(id: number): Promise<Todo> {
    let result: Todo = {} as Todo;
    await axios
      .get(`/tasks/${id}`)
      .then((response) => {
        const parsedResponse = this.hendleResponse(
          response
        ) as TodoJsonResponseType;
        result = this.convartTodo(parsedResponse);
      })
      .catch((error) => {
        if (error.isAxiosError) {
          return Promise.reject(new Error(error.response));
        } else {
          return Promise.reject(new Error(error));
        }
      });
    return Promise.resolve(result);
  }

  async create(params: Params): Promise<Todo> {
    let result: Todo = {} as Todo;
    await axios
      .post("/tasks", params)
      .then((response) => {
        const parsedResponse = this.hendleResponse(
          response
        ) as TodoJsonResponseType;
        result = this.convartTodo(parsedResponse);
      })
      .catch((error) => {
        if (error.isAxiosError) {
          return Promise.reject(new Error(error.response));
        } else {
          return Promise.reject(new Error(error));
        }
      });
    return Promise.resolve(result);
  }

  async update(id: number, todo: Todo): Promise<Todo> {
    let result: Todo = {} as Todo;
    await axios
      .put("/tasks", todo)
      .then((response) => {
        const parsedResponse = this.hendleResponse(
          response
        ) as TodoJsonResponseType;
        result = this.convartTodo(parsedResponse);
      })
      .catch((error) => {
        if (error.isAxiosError) {
          return Promise.reject(new Error(error.response));
        } else {
          return Promise.reject(new Error(error));
        }
      });
    return Promise.resolve(result);
  }

  async delete(id: number): Promise<void> {
    await axios
      .delete(`/tasks/${id}`)
      .then((response) => {
        this.hendleResponse(response) as TodoJsonResponseType;
      })
      .catch((error) => {
        if (error.isAxiosError) {
          return Promise.reject(new Error(error.response));
        } else {
          return Promise.reject(new Error(error));
        }
      });
    return Promise.resolve();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  hendleResponse(response: AxiosResponse<any>): Promise<never> | unknown {
    const baseJson: BaseJsonResponseType = response.data;
    if (baseJson.error_code != ResponseStatusCode.Success) {
      return Promise.reject(new Error(`api error ${baseJson.error_code}`));
    }
    return baseJson.data;
  }

  convartTodo(jsonData: TodoJsonResponseType): Todo {
    return {
      id: jsonData.id,
      title: jsonData.title,
      description: jsonData.description,
      isDone: jsonData.is_done,
    };
  }

  intitializeTodo(todo: Params): Todo {
    const date = new Date();
    return {
      id: date.getTime(),
      title: todo.title,
      description: todo.description,
      isDone: todo.isDone,
    } as Todo;
  }
}
