import connection from "../db.js";
import { failure } from "../misc/chalkAlerts.js";

export async function postCategorie(req, res) {
    const { name } = res.locals;

    try {
        await connection.query(`INSERT INTO categories (name) VALUES($1)`, [
            name,
        ]);
        return res.sendStatus(201);
    } catch (error) {
        failure(error);
        return res.sendStatus(500);
    }
}

export async function getCategories(req, res) {
    try {
        const categories = await connection.query("SELECT * FROM categories");
        return res.status(200).send(categories.rows);
    } catch (error) {
        failure(error);
        return res.sendStatus(500);
    }
}
