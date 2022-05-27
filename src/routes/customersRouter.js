import { Router } from "express";
import {
    getUsers,
    postUser,
    getUser,
    updateUser,
} from "../controllers/customersController.js";
import {
    cpfExists,
    verifyCustomerBody,
} from "../middlewares/customersMidleware.js";

const customersRouter = Router();

customersRouter.get("/customers", getUsers);
customersRouter.post("/customers", verifyCustomerBody, postUser);
customersRouter.get("/customers/:id", getUser);
customersRouter.put(
    "/customers/:id",
    verifyCustomerBody,
    cpfExists,
    updateUser
);

export default customersRouter;
