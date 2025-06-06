import { Router } from "express";
import {
  createBook,
  getBooks,
  getBookById,
  searchBooks,
} from "../controllers/book.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", getBooks);
router.get("/search", searchBooks);
router.get("/:id", getBookById);
router.post("/", verifyJWT, createBook);

export default router;
