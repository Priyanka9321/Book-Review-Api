import { Review } from "../models/review.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Add a review
const addReview = asyncHandler(async (req, res) => {
  const { id: bookId } = req.params;
  const { rating, comment } = req.body;

  if (!rating || rating < 1 || rating > 5) {
    throw new ApiError(400, "Rating must be between 1 and 5");
  }

  const review = await Review.create({
    book: bookId,
    user: req.user._id,
    rating,
    comment,
  });

  res.status(201).json(new ApiResponse(201, review, "Review added"));
});

// Update a review
const updateReview = asyncHandler(async (req, res) => {
  const { id: reviewId } = req.params;
  const { rating, comment } = req.body;

  const review = await Review.findOne({ _id: reviewId, user: req.user._id });
  if (!review) throw new ApiError(404, "Review not found");

  review.rating = rating ?? review.rating;
  review.comment = comment ?? review.comment;
  await review.save();

  res.json(new ApiResponse(200, review, "Review updated"));
});

// Delete a review
const deleteReview = asyncHandler(async (req, res) => {
  const { id: reviewId } = req.params;

  const review = await Review.findOneAndDelete({
    _id: reviewId,
    user: req.user._id,
  });

  if (!review) throw new ApiError(404, "Review not found");

  res.json(new ApiResponse(200, null, "Review deleted"));
});

export { addReview, updateReview, deleteReview };
