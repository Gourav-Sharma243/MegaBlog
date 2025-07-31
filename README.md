# 🚀 MegaBlog - Modern Blogging Platform

<div align="center">
  <img src="https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Vite-4.4.5-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.3.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/Appwrite-13.0.0-F02E65?style=for-the-badge&logo=appwrite&logoColor=white" alt="Appwrite" />
  <img src="https://img.shields.io/badge/Redux_Toolkit-1.9.5-764ABC?style=for-the-badge&logo=redux&logoColor=white" alt="Redux Toolkit" />
</div>

<br />

**MegaBlog** is a modern, feature-rich blogging platform built with React and powered by Appwrite. It offers a seamless writing experience with a beautiful, responsive design that adapts perfectly to both desktop and mobile devices.

## ✨ Features

### 🎨 **Modern Design**
- **Responsive UI**: Optimized for all screen sizes with mobile-first approach
- **Dark Mode Support**: Toggle between light and dark themes
- **Gradient Design**: Beautiful orange-to-teal gradient theme throughout
- **Smooth Animations**: Hover effects and transitions for enhanced UX

### 🔐 **Authentication & User Management**
- **Secure Authentication**: Email/password login with Appwrite
- **User Registration**: Easy signup process with validation
- **Password Recovery**: Forgot password and reset functionality
- **User Profiles**: Comprehensive profile pages with account information
- **Session Management**: Persistent login state with Redux

### 📝 **Content Management**
- **Rich Text Editor**: TinyMCE integration for advanced post editing
- **Draft System**: Save posts as drafts before publishing
- **Post Status Management**: Active/Draft visibility controls
- **Image Upload**: Featured image support with Appwrite storage
- **Post Categories**: Organize content efficiently

### 🚀 **Advanced Features**
- **Dual Post Views**:
  - **My Posts**: Private workspace showing all user posts (active + drafts)
  - **All Posts**: Public feed displaying only active posts from all users
- **Smart Navigation**: Different menu options for authenticated vs. unauthenticated users
- **Mobile Menu**: Hamburger menu for mobile devices
- **Quick Actions**: Easy access to create, edit, and manage posts
- **Real-time Updates**: Dynamic content loading and state management

### 🎯 **User Experience**
- **Landing Page**: Engaging homepage with features showcase
- **Empty States**: Helpful messages when no content is available
- **Loading States**: Smooth loading indicators throughout the app
- **Error Handling**: Graceful error management and user feedback
- **Intuitive Navigation**: Easy-to-use interface with clear visual hierarchy

## 🛠️ Tech Stack

### **Frontend**
- **React 18.2.0** - Modern React with Hooks and Context
- **Vite 4.4.5** - Lightning-fast build tool and dev server
- **Tailwind CSS 3.3.3** - Utility-first CSS framework
- **React Router DOM 6.16.0** - Client-side routing
- **Redux Toolkit 1.9.5** - State management
- **React Hook Form 7.46.1** - Form handling and validation

### **Backend & Services**
- **Appwrite 13.0.0** - Backend-as-a-Service
  - Authentication
  - Database (NoSQL)
  - File Storage
  - Real-time subscriptions

### **Additional Tools**
- **TinyMCE** - Rich text editor for post content
- **HTML React Parser** - Safe HTML rendering
- **ESLint** - Code linting and formatting
- **PostCSS & Autoprefixer** - CSS processing

## � Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Appwrite server instance

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/megablog.git
   cd megablog
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_APPWRITE_URL=your_appwrite_endpoint
   VITE_APPWRITE_PROJECT_ID=your_project_id
   VITE_APPWRITE_DATABASE_ID=your_database_id
   VITE_APPWRITE_COLLECTION_ID=your_collection_id
   VITE_APPWRITE_BUCKET_ID=your_bucket_id
   VITE_TINYMCE_API_KEY=your_tinymce_api_key
   ```

4. **Appwrite Configuration**
   
   Set up your Appwrite project with:
   - **Database**: Create a database for blog posts
   - **Collection**: Set up a collection with these attributes:
     ```
     - title (string, required)
     - content (string, required)
     - featuredImage (string)
     - status (string, required) - "active" or "inactive"
     - userId (string, required)
     - slug (string, required, unique)
     ```
   - **Storage**: Create a bucket for featured images
   - **Authentication**: Enable email/password authentication

5. **Start Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Build for Production**
   ```bash
   npm run build
   # or
   yarn build
   ```

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── AuthLayout.jsx   # Authentication wrapper
│   ├── Button.jsx       # Custom button component
│   ├── Input.jsx        # Form input component
│   ├── Login.jsx        # Login form
│   ├── Signup.jsx       # Registration form
│   ├── PostCard.jsx     # Blog post card
│   ├── UserMenu.jsx     # User navigation menu
│   ├── Header/          # Navigation header
│   ├── Footer/          # Site footer
│   └── post-form/       # Post creation/editing
├── pages/               # Page components
│   ├── Home.jsx         # Landing page
│   ├── AllPosts.jsx     # Public posts feed
│   ├── MyPosts.jsx      # User's private posts
│   ├── AddPost.jsx      # Create new post
│   ├── EditPost.jsx     # Edit existing post
│   ├── Post.jsx         # Single post view
│   └── Profile.jsx      # User profile
├── appwrite/            # Appwrite service configuration
│   ├── auth.js          # Authentication methods
│   └── config.js        # Database and storage methods
├── conf/                # Environment configuration
├── store/               # Redux store setup
└── assets/              # Static assets
```

## 🎨 Design System

### **Color Palette**
- **Primary**: Orange (#EA580C) to Teal (#0D9488) gradient
- **Background**: Gray-50 (light) / Gray-900 (dark)
- **Text**: Gray-900 (light) / White (dark)
- **Accents**: Green (success), Yellow (warning), Red (error)

### **Typography**
- **Headings**: Font-bold with various sizes (text-3xl, text-2xl, etc.)
- **Body**: Font-medium and font-normal
- **UI Elements**: Font-semibold for buttons and navigation

### **Components**
- **Buttons**: Gradient backgrounds with hover effects
- **Cards**: Rounded corners with subtle shadows
- **Forms**: Clean inputs with focus states
- **Navigation**: Responsive with mobile hamburger menu

## 🔐 Authentication Flow

1. **Landing Page**: Welcome screen for unauthenticated users
2. **Registration**: Create account with email verification
3. **Login**: Secure authentication with session management
4. **Password Recovery**: Reset password via email
5. **Protected Routes**: Automatic redirection for unauthorized access

## 📝 Content Management

### **Post Creation**
1. Rich text editor with formatting options
2. Featured image upload
3. Draft/Publish status selection
4. Automatic slug generation

### **Post Management**
- **My Posts**: View all personal posts (drafts + published)
- **Edit**: Modify existing posts
- **Delete**: Remove posts permanently
- **Status Toggle**: Switch between draft and active

### **Public Feed**
- **All Posts**: Community feed with only active posts
- **Post Cards**: Preview with featured images
- **Responsive Grid**: Adapts to screen size


## 🙏 Acknowledgments

- **Appwrite** for the excellent Backend-as-a-Service platform
- **TinyMCE** for the powerful rich text editor
- **Tailwind CSS** for the utility-first CSS framework
- **React Team** for the amazing frontend library

## 📞 Support

If you have any questions or need help, please:

1. Check the [Issues](https://github.com/your-username/megablog/issues) page
2. Create a new issue if your problem isn't already reported

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/your-username">Your Name</a></p>
  <p>⭐ Star this repository if you found it helpful!</p>
</div>

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Appwrite](https://appwrite.io/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [TinyMCE](https://www.tiny.cloud/)
- [React Hook Form](https://react-hook-form.com/)

---

