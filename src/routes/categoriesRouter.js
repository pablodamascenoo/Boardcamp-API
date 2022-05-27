import Router from "express";
import {
    postCategorie,
    getCategories,
} from "../controllers/categoriesController.js";
import { validateCategory } from "../middlewares/categoriesMiddleware.js";

const categoriesRouter = Router();

categoriesRouter.post("/categories", validateCategory, postCategorie);
categoriesRouter.get("/categories", getCategories);

export default categoriesRouter;
