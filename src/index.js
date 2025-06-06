import dotenv from "dotenv";
dotenv.config();
import connectDB from "./db/db.js";
import app from "./app.js";
const PORT = process.env.PORT || 3030;

// Handle unexpected app level errors
app.on("error", (error) => {
  console.log("App Error || : ", error);
  process.exit(1);
});

// connect to DB and start server
connectDB()
  .then(
    app.listen(PORT, () => {
      console.log(`Server is runing at ${PORT}.`);
    })
  )
  .catch((error) => {
    console.error("MongoDB connection failed!!", error);
  });
