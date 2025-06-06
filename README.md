# 📚Book Review API

A RESTful API built with Node.js, Express.js, and MongoDB for managing books and their reviews. The API uses JWT-based authentication and supports features like pagination, filtering, and searching.

---

## 🔧 Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Token (JWT)
- dotenv for environment variables

---

## 🚀 Project Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/yourusername/book-review-api.git
cd book-review-api
```
2. Install dependencies:
```bash
npm install
```
3. Create a .env file in the root directory and add the following environment variables:
```bash
MONGODB_URI= YOUR_MONGODB_URI
PORT=8000
ACCESS_TOKEN_SECRET=YOUR_ACCESS_TOKEN_SECRET
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=YOUR_REFRESH_TOKEN_SECRET
REFRESH_TOKEN_EXPIRY=7d
```
4. Start the server:
```bash
npm run dev
```

## 📚 API Endpoints

## Authentication
1. POST /signup
Register a new user.
Request body:
```json
{
  "username": "user1",
  "email": "user1@example.com",
  "password": "password123"
}
```
2. POST /login
Login and receive JWT token.
Request body:
```json
{
  "email": "user1@example.com",
  "password": "password123"
}
```

## Books
1. POST /books (Authenticated)
Add a new book.
Request body:
```json
{
  "title": "Book Title",
  "author": "Author Name",
  "genre": "Fiction",
  "description": "Brief description of the book"
}
```
2. GET /books
Get all books with optional pagination and filters.
Query parameters:
page (default: 1)
limit (default: 10)
author (optional)
genre (optional)

3. GET /books/:id
Get details of a book by ID, including average rating and reviews.

4. GET /search
Search books by title or author (partial, case-insensitive).
Query parameters:
q (search query string)

## Reviews
1. POST /books/:id/reviews (Authenticated)
Submit a review for a book (one review per user per book).
Request body:
```json
{
  "rating": 4,
  "comment": "Great book!"
}
```
2. PUT /reviews/:id (Authenticated)
Update your own review.

3. DELETE /reviews/:id (Authenticated)
Delete your own review.

## 🗂 Database Schema (Brief)

## Users

| Field    | Type     | Description     |
| -------- | -------- | --------------- |
| \_id     | ObjectId | Unique user ID  |
| username | String   | User's username |
| email    | String   | User's email    |
| password | String   | Hashed password |

## Books

| Field       | Type     | Description       |
| ----------- | -------- | ----------------- |
| \_id        | ObjectId | Unique book ID    |
| title       | String   | Book title        |
| author      | String   | Author's name     |
| genre       | String   | Genre of the book |
| description | String   | Brief description |

## Reviews

| Field   | Type     | Description               |
| ------- | -------- | ------------------------- |
| \_id    | ObjectId | Unique review ID          |
| bookId  | ObjectId | Reference to the book     |
| userId  | ObjectId | Reference to the reviewer |
| rating  | Number   | Rating (e.g., 1-5)        |
| comment | String   | Review comment            |

## 💡 Design Decisions / Assumptions

- JWT tokens are used for stateless authentication.
- Passwords are securely hashed using bcrypt.
- Each user can submit only one review per book.
- Pagination defaults to 10 items per page to optimize performance.
- MongoDB is used for flexible schema design

## 🏃‍♂️ How to run locally

1. Clone the repo and install dependencies (npm install).
2. Setup .env file with your config.
3. Run the development server using npm run dev.
4. Use Postman or any API client to interact with the endpoints.
