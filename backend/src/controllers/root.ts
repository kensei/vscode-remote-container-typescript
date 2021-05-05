import { Request, Response } from "express";

export const Root = (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
};
