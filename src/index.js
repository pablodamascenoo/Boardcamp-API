import cors from "cors";
import express, { json } from "express";
import dotenv from "dotenv";
import chalk from "chalk";
import router from "./routes/index.js";

dotenv.config();

const port = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(json());
app.use(router);

app.listen(port, () => {
    console.log(chalk.bold.cyan("\n Server running...\n"));
});
