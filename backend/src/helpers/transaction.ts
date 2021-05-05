import { Pool, PoolConnection } from "mysql2/promise";

export async function transaction(
  conn: PoolConnection,
  func: (connection: PoolConnection) => Promise<any | void>
): Promise<any | void> {
  try {
    await conn.beginTransaction;
    var result = await func(conn);
    await conn.commit;
    return result;
  } catch (e) {
    console.log(e);
    await conn.rollback;
    throw e;
  } finally {
    conn.release;
  }
}
