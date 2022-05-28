import connection from "../db.js";
import { failure } from "../misc/chalkAlerts.js";
import gamesSchema from "../schemas/gamesSchema.js";

export async function validateGame(req, res, next) {
    const game = req.body;

    const { error } = gamesSchema.validate({ ...game });

    if (error) {
        return res.sendStatus(422);
    }

    try {
        if (
            !(
                await connection.query(`SELECT * FROM categories WHERE id=$1`, [
                    game.categoryId,
                ])
            ).rowCount
        )
            return res.sendStatus(400);
        if (
            (
                await connection.query(`SELECT * FROM games WHERE name=$1`, [
                    game.name,
                ])
            ).rowCount
        )
            return res.sendStatus(409);
    } catch (e) {
        failure(e);
        return res.sendStatus(500);
    }

    res.locals.game = game;
    next();
}
