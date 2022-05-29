import Router from "express";
import { postRental } from "../controllers/rentalsController.js";
import { verifyRental } from "../middlewares/rentalsMiddleware.js";

const rentalsRouter = Router();

rentalsRouter.get("/rentals");
rentalsRouter.post("/rentals", verifyRental, postRental);
rentalsRouter.post("/rentals/:id/return");
rentalsRouter.delete("/rentals/:id");

export default rentalsRouter;
