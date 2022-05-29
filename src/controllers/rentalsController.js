import connection from "../db.js";
import dayjs from "dayjs";
import { failure, success } from "../misc/chalkAlerts.js";

export async function postRental(req, res) {
    const { customerId, gameId, daysRented } = res.locals.rental;
    const { price } = res.locals;
    const today = dayjs().format("YYYY-MM-DD").toString();
    const originalPrice = price * daysRented;

    try {
        await connection.query(
            `INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented","originalPrice") VALUES ($1,$2,$3,$4,$5)`,
            [customerId, gameId, today, daysRented, originalPrice]
        );
        return res.sendStatus(201);
    } catch (error) {
        failure(`${error} controller`);
        return res.sendStatus(500);
    }
}
