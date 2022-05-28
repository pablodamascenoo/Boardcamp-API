import Router from "express";
import { postGame } from "../controllers/gamesController.js";
import { validateGame } from "../middlewares/gamesMiddleware.js";

const gamesRouter = Router();

gamesRouter.post("/games", validateGame, postGame);

export default gamesRouter;
