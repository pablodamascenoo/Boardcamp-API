import connection from "../db.js";
import { failure } from "../misc/chalkAlerts.js";

export async function postGame(req, res) {
    const { name, image, stockTotal, categoryId, pricePerDay } =
        res.locals.game;

    try {
        await connection.query(
            `INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES($1,$2,$3,$4,$5)`,
            [name, image, stockTotal, categoryId, pricePerDay]
        );
        return res.sendStatus(201);
    } catch (error) {
        failure(error);
        return res.sendStatus(500);
    }
}
