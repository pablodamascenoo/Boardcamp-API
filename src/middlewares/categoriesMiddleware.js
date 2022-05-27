import connection from "../db.js";
import categoriesSchema from "../schemas/categoriesSchema.js";

export async function validateCategory(req, res, next) {
    const { name } = req.body;

    const { error } = categoriesSchema.validate(name);

    if (error) return res.sendStatus(400);

    try {
        const query = await connection.query(
            `SELECT * FROM categories WHERE name = $1`,
            [name]
        );
        if (query.rowCount) return res.sendStatus(409);
    } catch (e) {
        failure(e);
        return res.sendStatus(500);
    }

    res.locals.name = name;
    next();
}
