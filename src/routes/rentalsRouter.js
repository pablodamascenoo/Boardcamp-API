import Router from "express";
import { getRentals, postRental } from "../controllers/rentalsController.js";
import { verifyRental } from "../middlewares/rentalsMiddleware.js";

const rentalsRouter = Router();

rentalsRouter.get("/rentals", getRentals);
rentalsRouter.post("/rentals", verifyRental, postRental);
rentalsRouter.post("/rentals/:id/return");
rentalsRouter.delete("/rentals/:id");

export default rentalsRouter;
