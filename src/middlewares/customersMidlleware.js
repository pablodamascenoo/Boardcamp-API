import customersSchema from "../schemas/customersSchema.js";
import { warning, failure } from "../misc/chalkAlerts.js";
import connection from "../db.js";

export async function verifyCustomerBody(req, res, next) {
    const { name, phone, cpf, birthday } = req.body;

    const { error, value } = customersSchema.validate({
        name,
        phone,
        cpf,
        birthday,
    });

    if (error) {
        let errorKey = JSON.stringify(error.details[0].context.key);
        return errorKey === '"birthday"'
            ? res.sendStatus(400)
            : res.sendStatus(422);
    }

    try {
        const response = await connection.query(
            `SELECT * FROM customers WHERE cpf=$1`,
            [cpf]
        );
        if (response.rows.length) {
            return res.sendStatus(409);
        }
    } catch (e) {
        failure(e);
        return res.sendStatus(500);
    }

    res.locals.customer = { ...value };
    next();
}
