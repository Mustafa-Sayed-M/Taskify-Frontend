# Taskify Frontend ✅

**Taksify** is a task management app that allows users to create, update, and manage their tasks smoothly.  
This is the frontend of the app, built using **React**, **Vite**, and **TailwindCSS**, with **Clerk** for authentication and **React Query** for data fetching and caching.

> 🔗 Paired with the [Taksify Backend](https://github.com/Mustafa-Sayed-M/Taskify-Backend), which is deployed using Vercel Serverless Functions and MongoDB.

---

## 🚀 Features

- Modern UI with Tailwind CSS
- Authentication using Clerk
- Form validation using Formik + Yup
- Toast notifications via React Toastify
- Data fetching and caching with React Query
- Client-side routing with React Router
- Fully responsive and optimized with Vite

---

## 🛠️ Tech Stack

- **React 19**
- **Vite**
- **TailwindCSS**
- **Clerk Authentication**
- **React Query**
- **Formik & Yup**
- **React Toastify**
- **React Router DOM**

---

## 📦 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Mustafa-Sayed-M/taksify-frontend.git
   cd taksify-frontend

2. Install dependencies:

    ```bash
    npm install

3. Create a `.env` file and add your Clerk credentials:

    ```bash
    VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

4. Run the development server:

    ```bash
    npm run dev

## 🔐 Authentication

Authentication is handled using Clerk, which provides:

- Sign in / Sign up flows
- Session management
- Secure access to protected routes

## 🔄 API Integration

The app communicates with a backend hosted on Vercel, which uses MongoDB for storing tasks.

All data operations (CRUD) are done through API calls managed via React Query for caching and performance.

## 📄 License

This project is licensed under the ISC License.

## 🧑‍💻 Author

Developed by [Mustafa Sayed](https://www.linkedin.com/in/sh3dowone1/)
