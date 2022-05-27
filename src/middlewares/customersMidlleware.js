import customersSchema from "../schemas/customersSchema.js";
import { warning, failure } from "../misc/chalkAlerts.js";
import connection from "../db.js";

export async function verifyCustomerBody(req, res, next) {
    const { name, phone, cpf, birthday } = req.body;

    if (isNaN(new Date(birthday).getTime())) return res.sendStatus(400);

    const { error, value } = customersSchema.validate({
        name,
        phone,
        cpf,
        birthday,
    });

    if (error) {
        warning(error);
        return res.sendStatus(422);
    }

    try {
        if (
            await connection.query(`SELECT * FROM customers WHERE cpf=$1`, [
                cpf,
            ])
        )
            return res.sendStatus(409);
    } catch (e) {
        failure(e);
        return res.sendStatus(500);
    }

    res.locals.customer = { ...value };
    next();
}
