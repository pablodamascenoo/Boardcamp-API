import cors from "cors";
import express, { json } from "express";
import dotenv from "dotenv";
import chalk from "chalk";

dotenv.config();

const port = process.env.PORT_EXPRESS || 4000;

const app = express();

app.use(cors());
app.use(json());

app.listen(port, () => {
    console.log(chalk.bold.cyan("\n Server running...\n"));
});
