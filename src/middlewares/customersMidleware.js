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

    res.locals.customer = { ...value };
    next();
}

export async function cpfExists(req, res, next) {
    const { id } = req.params;
    const { cpf } = res.locals.customer;
    let query;

    try {
        id
            ? (query = await connection.query(
                  `SELECT * FROM customers WHERE id != $1 AND cpf = $2`,
                  [id, cpf]
              ))
            : (query = await connection.query(
                  `SELECT * FROM customers WHERE cpf = $1`,
                  [cpf]
              ));
        if (query.rowCount) return res.sendStatus(409);
    } catch (e) {
        failure(e);
        return res.sendStatus(500);
    }

    res.locals.id = id;
    next();
}
