import Joi from "joi";

const customersSchema = Joi.object({
    name: Joi.string().required(),
    cpf: Joi.string()
        .pattern(/^(\d{11})$/)
        .required(),
    phone: Joi.string()
        .pattern(/^(\d{10,11})$/)
        .required(),
    birthday: Joi.date().required(),
});

export default customersSchema;
