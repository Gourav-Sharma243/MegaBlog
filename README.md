# MegaBlog

MegaBlog is a modern blogging platform built with **React**, **Vite**, **Tailwind CSS**, and **Appwrite**. It supports user authentication, rich text editing, image uploads, and a fully responsive UI. Users can easily create, edit, and manage blog posts through a sleek and intuitive interface.

---

## ✨ Features

- 🔐 User Authentication (Sign up, Login, Logout)
- ✍️ Create, Edit, and Delete Blog Posts
- 🖋️ Rich Text Editing (TinyMCE Integration)
- 🖼️ Featured Image Uploads
- ⚡ Fast and Responsive UI (Tailwind CSS)
- 🔒 Protected Routes for Authenticated Users
- 🗂️ Post Listing & Individual Post View
- 🧩 Appwrite Backend Integration

---

## 🛠 Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Appwrite](https://appwrite.io/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [TinyMCE](https://www.tiny.cloud/)
- [React Hook Form](https://react-hook-form.com/)

---

## 🚀 Getting Started

### ✅ Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- An [Appwrite](https://appwrite.io/) instance (self-hosted or cloud)

### 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/megablog.git
   cd megablog

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   * Copy the `.env.sample` file to `.env`:

     ```bash
     cp .env.sample .env
     ```

   * Fill in your Appwrite credentials (project ID, endpoint, etc.).

4. **Start the development server**

   ```bash
   npm run dev
   ```

---

## 📁 Project Structure

```txt
src/
├── appwrite/        # Appwrite service integration
├── assets/          # Static assets
├── components/      # Reusable UI components
├── conf/            # Configuration files
├── pages/           # Route components (AllPosts, Post, EditPost, etc.)
├── store/           # Redux store and slices
├── index.css        # Tailwind CSS entry
├── main.jsx         # App entry point
├── App.jsx          # Root component
public/
├── vite.svg         # Favicon / public assets
```

---

