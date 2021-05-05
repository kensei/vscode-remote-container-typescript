import { Response } from "express";

export async function respondWith(
  res: Response,
  err_code: number,
  result: any
): Promise<Response> {
  return res.json({ error_code: err_code, data: result });
}
