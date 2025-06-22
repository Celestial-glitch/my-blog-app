# Minimal Blog App

A full-stack Blog App built using **React (Vite)**, **Node.js**, **Express**, and **MongoDB** that allows users to create, view, like, edit, and delete blog posts — all without a traditional login system. Each post can be protected with a user-defined password for secure edits and deletions. Passwords are securely encrypted using bcrypt before storage.

---

## Features

- Create, Read, Update, Delete blog posts
- Password protection for blog edits and deletions
- Passwords are encrypted using bcrypt before being stored in the database
- Like and unlike blogs (once per blog)
- Category selection during blog creation (e.g., Tech, Travel, Lifestyle)
- Default images shown based on category
- Edit form is prefilled with existing blog data
- View liked blogs on a separate page
- Clean and responsive user interface using Tailwind CSS

---

## Tech Stack

### Frontend
- React (Vite)
- React Router
- Axios
- Tailwind CSS
- Daisy UI (for styled components)

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- bcryptjs (for encrypting and validating blog passwords)
- Multer (for handling image uploads)

---
