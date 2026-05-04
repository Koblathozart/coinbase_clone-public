# Coinbase Clone

A full-stack cryptocurrency exchange platform clone inspired by Coinbase. This application features a modern UI with a dark mode aesthetic, multi-step authentication, and an integrated backend for user management.

## 🚀 Tech Stack

### Frontend
- **React 19** with Vite
- **Tailwind CSS v4** for styling and responsive design
- **React Router v7** for client-side navigation

### Backend
- **Node.js & Express**
- **MongoDB & Mongoose** for the database
- **JWT (JSON Web Tokens)** for secure authentication
- **Bcryptjs** for password hashing
- **Nodemailer** for email services

## 📁 Project Structure

The project is organized with separate frontend and backend directories, tied together with root scripts:

- `/frontend` - Contains the React client application.
- `/backend` - Contains the Express server, API routes, models, and controllers.

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas)

### Installation

1. **Clone the repository** and navigate into the project directory:
   ```bash
   git clone <repository-url>
   cd Koblathozart-crypto-app-public
   ```

2. **Install dependencies**:
   ```bash
   # Install root dependencies (concurrently)
   npm install

   # Install frontend dependencies
   cd frontend
   npm install
   cd ..

   # Install backend dependencies
   cd backend
   npm install
   cd ..
   ```

3. **Set up Environment Variables**:
   Create a `.env` file in the `backend/` directory and add your configuration. Here is an example of what it should look like:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CORS_ORIGIN=http://localhost:5173
   EMAIL_USER=your_email@example.com
   EMAIL_PASSWORD=your_email_app_password
   ```

### Running the Application (Development)

You can start both the frontend and backend simultaneously from the root directory using the `concurrently` package:

```bash
npm run dev
```

- The **Frontend** will be running at `http://localhost:5173`
- The **Backend API** will be running at `http://localhost:5000`

## ✨ Key Features

- **User Authentication**: Secure signup and login flow using JSON Web Tokens (JWT).
- **Modern Dashboard UI**: Polished, responsive design mirroring the official Coinbase layout.
- **Dark Mode Aesthetic**: Production-grade dark theme for an enhanced, premium user experience.
- **Email Integration**: Backend configured with Nodemailer for actions like user verification and notifications.

## 📜 Available Scripts (Root)

Available in the root `package.json`:
- `npm run dev`: Starts both frontend and backend concurrently.
- `npm run dev:frontend`: Starts only the Vite frontend server.
- `npm run dev:backend`: Starts only the Express backend server.
- `npm run build`: Builds the frontend for production.
- `npm run lint`: Runs ESLint across the project.
