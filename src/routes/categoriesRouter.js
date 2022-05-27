import Router from "express";
import { postCategorie } from "../controllers/categoriesController.js";
import { validateCategory } from "../middlewares/categoriesMiddleware.js";

const categoriesRouter = Router();

categoriesRouter.post("/categories", validateCategory, postCategorie);

export default categoriesRouter;
