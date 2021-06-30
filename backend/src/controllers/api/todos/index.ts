import { Request, Response } from "express";
import { Pool, PoolConnection, ResultSetHeader } from "mysql2/promise";
import * as mysql from "mysql2";
import { connect } from "../../../infrastructure/mysql";
import { respondWith } from "../../../helpers/response";
import { ResponseStatusCode } from "../../../config/const";
import { transaction } from "../../../helpers/transaction";

export async function getTasks(
  req: Request,
  res: Response
): Promise<Response | void> {
  try {
    const conn = await connect();
    const tasks = await conn.query("SELECT * FROM tasks");
    console.log(tasks[0]);
    const response = {
      user_id: req.body.userId,
      tasks: tasks[0],
    };
    return respondWith(res, ResponseStatusCode.Success, response);
  } catch (e) {
    console.log(e);
    return respondWith(res, ResponseStatusCode.Fail, null);
  }
}

export async function getTaskById(
  req: Request,
  res: Response
): Promise<Response | void> {
  console.log("getTask:" + req.params.id);
  res.send("getTask:" + req.params.id);
}

export async function updateTask(req: Request, res: Response) {
  console.log("updateTask:" + req.params.id);
  res.send("updateTask:" + req.params.id);
}

export async function updateTaskToDone(req: Request, res: Response) {
  console.log("updateTask:" + req.params.id);
  res.send("updateTaskToDone:" + req.params.id);
}

export async function addTask(req: Request, res: Response) {
  console.log(
    "addTask: title " + req.body.title + ", descitption " + req.body.description
  );

  const pool: Pool = await connect();
  const conn: PoolConnection = await pool.getConnection();
  try {
    await transaction(conn, async (connection: PoolConnection): Promise<
      any | void
    > => {
      const newTitle: string = req.body.title;
      const newDescription: string = req.body.description;
      const addTask = await connection.query(
        "insert into tasks (title, description) values (?, ?)",
        [newTitle, newDescription]
      );
      console.log(addTask);
      const resultSet: any = addTask[0];
      const result = {
        id: resultSet.insertId,
        title: newTitle,
        description: newDescription,
      };
      return respondWith(res, ResponseStatusCode.Success, result);
    });
  } catch (e) {
    return respondWith(res, ResponseStatusCode.Fail, null);
  }
}

export async function deleteTask(req: Request, res: Response) {
  console.log("" + req.params.id);
  res.send("deleteTask:" + req.params.id);
}
