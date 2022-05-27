import { Router } from "express";
import { getUsers, postUser } from "../controllers/customersController.js";
import { verifyCustomerBody } from "../middlewares/customersMidlleware.js";

const customersRouter = Router();

customersRouter.get("/customers", getUsers);
customersRouter.post("/customers", verifyCustomerBody, postUser);

export default customersRouter;
