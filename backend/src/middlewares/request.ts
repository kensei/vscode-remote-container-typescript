import { Express } from "express";
import * as bodyParser from "body-parser";

export function useRequestMiddlewares(app: Express) {
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(bodyParser.json());
}
