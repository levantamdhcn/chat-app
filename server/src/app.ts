const express = require("express");
const cors = require("cors");
const http = require("http");

const app = express();
app.use(cors());

const router = express();

const httpServer = http.createServer(router);

httpServer.listen("3000", () => `Server is running at PORT 3000`);
