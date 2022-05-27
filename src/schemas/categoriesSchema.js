import Joi from "joi";

const categoriesSchema = Joi.string().required();

export default categoriesSchema;
