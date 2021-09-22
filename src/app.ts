import express from "express";

import corsHandler from "./utils/cors";
import todoRoutes from "./routes/todo";

const app = express();

app.use(express.json());
app.use(corsHandler);
app.use(todoRoutes);

app.listen(3000);
