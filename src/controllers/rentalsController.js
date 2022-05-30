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

export async function getRentals(req, res) {
    const customerId = req.query.customerId;
    const gameId = req.query.gameId;

    if ((customerId && isNaN(customerId * 1)) || (gameId && isNaN(gameId * 1)))
        return res.status(200).send([]);

    const customerIdQuery = customerId ? `"customerId"=${customerId}` : "1=1";

    const gameIdQuery = gameId ? `"gameId"=${gameId}` : "1=1";

    try {
        const rentals = await connection.query(
            `
        SELECT rentals.*, customers.name AS "customerName", games.name AS "gameName", games."categoryId", categories.name as "categoryName"
        FROM rentals
        JOIN customers ON customers.id = rentals."customerId"
        JOIN games ON games.id = rentals."gameId"
        JOIN categories ON categories.id = games."categoryId" WHERE ${customerIdQuery} AND ${gameIdQuery}
        `
        );

        let formatedRentals = [];

        for (let rental of rentals.rows) {
            rental = {
                ...rental,
                customer: {
                    id: rental.customerId,
                    name: rental.customerName,
                },
                game: {
                    id: rental.gameId,
                    name: rental.gameName,
                    categoryId: rental.categoryId,
                    categoryName: rental.categoryName,
                },
            };

            delete rental.categoryId;
            delete rental.categoryName;
            delete rental.gameName;
            delete rental.customerName;

            formatedRentals.push(rental);
        }

        return res.status(200).send(formatedRentals);
    } catch (error) {
        failure(error);
        return res.sendStatus(500);
    }
}
