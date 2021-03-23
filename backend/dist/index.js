"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var PORT = 8000;
app.get('/', function (req, res) { return res.send('Express + TypeScript Server'); });
app.listen(PORT, function () {
    console.log("[server]: Server is running at https://localhost:" + PORT);
});
//# sourceMappingURL=index.js.map