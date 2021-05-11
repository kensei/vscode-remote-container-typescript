import { Express } from "express";
import cors from "cors";
import { CORS_URI } from "config/const";

export function useCorsMiddlewares(app: Express) {
  app.use(
    cors({
      origin: CORS_URI, // アクセス許可するオリジン
      credentials: true, // レスポンスヘッダーにAccess-Control-Allow-Credentials追加
      optionsSuccessStatus: 200, // レスポンスstatusを200に設定
    })
  );
}
