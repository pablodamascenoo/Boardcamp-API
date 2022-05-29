import Router from "express";
import { getGames, postGame } from "../controllers/gamesController.js";
import { validateGame } from "../middlewares/gamesMiddleware.js";

const gamesRouter = Router();

gamesRouter.post("/games", validateGame, postGame);
gamesRouter.get("/games", getGames);

export default gamesRouter;
