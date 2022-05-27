import { warning, failure, success } from "../misc/chalkAlerts.js";
import connection from "../db.js";

export async function getUsers(req, res) {
    try {
        const users = await connection.query("SELECT * FROM customers");
        res.status(200).send(users.rows);
    } catch (error) {
        failure(error);
        res.sendStatus(500);
    }
}

export async function postUser(req, res) {
    const { name, phone, cpf, birthday } = res.locals.customer;

    try {
        await connection.query(
            `INSERT INTO customers (name,phone,cpf,birthday) VALUES($1, $2, $3, $4)`,
            [name, phone, cpf, birthday]
        );
        return res.sendStatus(201);
    } catch (error) {
        failure(error);
        return res.sendStatus(500);
    }
}

export async function getUser(req, res) {
    const { id } = req.params;

    try {
        const users = await connection.query(
            `SELECT * FROM customers WHERE id=$1`,
            [id]
        );

        if (!users.rowCount) return res.sendStatus(404);

        return res.status(200).send(users.rows[0]);
    } catch (error) {
        failure(error);
        res.sendStatus(500);
    }
}
