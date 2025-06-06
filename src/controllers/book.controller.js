import { Book } from "../models/book.model.js";
import { Review } from "../models/review.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";

// Add new book
const createBook = asyncHandler(async (req, res) => {
  const { title, author, genre, description } = req.body;

  if (!title || !author) {
    throw new ApiError(400, "Title and Author are required");
  }

  const book = await Book.create({
    title,
    author,
    genre,
    description,
    createdBy: req.user._id,
  });

  res.status(201).json(new ApiResponse(201, book, "Book created successfully"));
});

// Get all books with optional filters and pagination
const getBooks = asyncHandler(async (req, res) => {
  const { author, genre, page = 1, limit = 10 } = req.query;
  const filter = {};

  if (author) filter.author = new RegExp(author, "i");
  if (genre) filter.genre = new RegExp(genre, "i");

  const books = await Book.find(filter)
    .skip((page - 1) * limit)
    .limit(Number(limit));

  const totalBooks = await Book.countDocuments(filter);

  res.json(
    new ApiResponse(200, { books, totalBooks }, "Books fetched successfully")
  );
});

// Get single book with average rating and reviews
const getBookById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid Book ID");
  }

  const book = await Book.findById(id);
  if (!book) throw new ApiError(404, "Book not found");

  const reviews = await Review.find({ book: id })
    .populate("user", "fullname email")
    .skip((page - 1) * limit)
    .limit(Number(limit));

  const totalReviews = await Review.countDocuments({ book: id });

  const avgRating = await Review.aggregate([
    { $match: { book: book._id } },
    { $group: { _id: "$book", avgRating: { $avg: "$rating" } } },
  ]);

  res.json(
    new ApiResponse(200, {
      book,
      averageRating: avgRating[0]?.avgRating || 0,
      reviews,
      totalReviews,
    })
  );
});

// Search books by title or author
const searchBooks = asyncHandler(async (req, res) => {
  const { query } = req.query;
  if (!query) {
    throw new ApiError(400, "Search query is required");
  }

  const books = await Book.find({
    $or: [
      { title: { $regex: query, $options: "i" } },
      { author: { $regex: query, $options: "i" } },
    ],
  });

  res.json(new ApiResponse(200, books, "Search results"));
});

export { createBook, getBooks, getBookById, searchBooks };
