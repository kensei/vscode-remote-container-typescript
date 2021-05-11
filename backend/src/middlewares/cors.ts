import { Express } from "express";
import { Cors } from "cors";

export function useCorsMiddlewares(app: Express) {
  app.use(
    Cors({
      origin: "http://localhost:3000", //アクセス許可するオリジン
      credentials: true, //レスポンスヘッダーにAccess-Control-Allow-Credentials追加
      optionsSuccessStatus: 200, //レスポンスstatusを200に設定
    })
  );
}
