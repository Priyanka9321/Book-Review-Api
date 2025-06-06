import { Router } from "express";
import {
  addReview,
  updateReview,
  deleteReview,
} from "../controllers/review.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/books/:id/reviews", verifyJWT, addReview);
router.put("/reviews/:id", verifyJWT, updateReview);
router.delete("/reviews/:id", verifyJWT, deleteReview);

export default router;
