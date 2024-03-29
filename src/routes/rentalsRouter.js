import Router from "express";
import {
    deleteRental,
    getRentals,
    postRental,
    returnRental,
} from "../controllers/rentalsController.js";
import { findRental, verifyRental } from "../middlewares/rentalsMiddleware.js";

const rentalsRouter = Router();

rentalsRouter.get("/rentals", getRentals);
rentalsRouter.post("/rentals", verifyRental, postRental);
rentalsRouter.post("/rentals/:id/return", findRental, returnRental);
rentalsRouter.delete("/rentals/:id", findRental, deleteRental);

export default rentalsRouter;
