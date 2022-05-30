import connection from "../db.js";
import { failure } from "../misc/chalkAlerts.js";
import rentalsSchema from "../schemas/rentalsSchema.js";

export async function verifyRental(req, res, next) {
    const rental = req.body;

    const { error } = rentalsSchema.validate(rental);

    if (error) return res.sendStatus(400);

    try {
        let customer = await connection.query(
            "SELECT * FROM customers WHERE id=$1",
            [rental.customerId]
        );

        let game = await connection.query("SELECT * FROM games WHERE id=$1", [
            rental.gameId,
        ]);

        let rentals = await connection.query(
            `SELECT * FROM rentals WHERE "gameId"=$1 AND "returnDate" IS NULL;`,
            [rental.gameId]
        );

        if (
            !customer.rowCount ||
            !game.rowCount ||
            rentals.rowCount >= game.rows[0].stockTotal
        ) {
            return res.sendStatus(400);
        }

        res.locals.price = game.rows[0].pricePerDay;
        res.locals.rental = rental;
        next();
    } catch (e) {
        failure(e);
        return res.sendStatus(500);
    }
}

export async function findRental(req, res, next) {
    const { id } = req.params;

    try {
        const rental = await connection.query(
            "SELECT * FROM rentals WHERE id=$1",
            [id]
        );

        if (!rental.rowCount) return res.sendStatus(404);
        if (rental.rows[0].returnDate) return res.sendStatus(400);

        res.locals.id = id;
        res.locals.rental = { ...rental.rows[0] };
        next();
    } catch (e) {
        failure(e);
        return res.sendStatus(500);
    }
}
