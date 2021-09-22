import express from "express";

import corsHandler from "./utils/cors";

const app = express();

app.use(corsHandler);

app.listen(3000);
