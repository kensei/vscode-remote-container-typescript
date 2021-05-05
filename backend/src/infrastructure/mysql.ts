import { createPool, Pool } from "mysql2/promise";

export async function connect(): Promise<Pool> {
  const connection = await createPool({
    host: "mysql",
    port: 3306,
    user: "test",
    database: "test",
    password: "secret",
    connectionLimit: 10,
  });
  return connection;
}
