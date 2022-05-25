import chalk from "chalk";
import connection from "../db.js";

export async function getUsers(req, res) {
    try {
        const users = await connection.query("SELECT * FROM customers");
        res.status(200).send(users.rows);
    } catch (error) {
        console.log(chalk.bold.red(error));
        res.sendStatus(500);
    }
}
