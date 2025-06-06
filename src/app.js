import express from "express";
import cors from "cors";
// Routes
import userRouter from "./routes/user.routes.js";
import bookRoutes from "./routes/book.routes.js";
import reviewRoutes from "./routes/review.routes.js";
const app = express();



app.use(cors({ origin: process.env.CORS_ORIGIN }));

app.use(express.json({}));

app.use(express.urlencoded({ extended: true }));

// Routes decalaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/books", bookRoutes);
app.use("/api/v1", reviewRoutes);



export default app;
