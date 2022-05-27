import { Router } from "express";
import {
    getUsers,
    postUser,
    getUser,
} from "../controllers/customersController.js";
import { verifyCustomerBody } from "../middlewares/customersMidlleware.js";

const customersRouter = Router();

customersRouter.get("/customers", getUsers);
customersRouter.post("/customers", verifyCustomerBody, postUser);
customersRouter.get("/customers/:id", getUser);

export default customersRouter;
