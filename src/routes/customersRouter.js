import { Router } from "express";
import { getUsers } from "../controllers/customersController.js";

const customersRouter = Router();

customersRouter.get("/customers", getUsers);

export default customersRouter;
