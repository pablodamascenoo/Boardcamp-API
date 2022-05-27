import JoiBase from "joi";
import JoiDate from "@joi/date";

const Joi = JoiBase.extend(JoiDate);

const customersSchema = Joi.object({
    name: Joi.string().required(),
    cpf: Joi.string().min(11).max(11).required(),
    phone: Joi.string().min(10).max(11).required(),
    birthday: Joi.date().format("YYYY-MM-DD").utc(),
});

export default customersSchema;
