import connection from "../db.js";
import { failure, warning } from "../misc/chalkAlerts.js";

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

export async function getGames(req, res) {
    const { name } = req.query;
    let like = "%";

    if (name) {
        like = name + like;
    }

    try {
        const games = await connection.query(
            `SELECT games.*, categories.name as "categoryName" FROM games JOIN categories ON games."categoryId"=categories.id WHERE LOWER(games.name) LIKE $1`,
            [like]
        );
        res.status(200).send(games.rows);
    } catch (error) {
        failure(error);
        return res.sendStatus(500);
    }
}
