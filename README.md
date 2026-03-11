# 🚀 MegaBlog - Professional Blogging Refined

<div align="center">
  <img src="https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Shadcn_UI-Latest-000000?style=for-the-badge&logo=shadcnui&logoColor=white" alt="ShadcnUI" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.3.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/Appwrite-13.0.0-F02E65?style=for-the-badge&logo=appwrite&logoColor=white" alt="Appwrite" />
  <img src="https://img.shields.io/badge/Framer_Motion-12.0-ff69b4?style=for-the-badge&logo=framer&logoColor=white" alt="FramerMotion" />
</div>

<br />

**MegaBlog** is a premium, minimalist blogging platform designed for modern creators. It features a refined **V5 Aesthetic** (Deep Navy & Indigo) with a focus on continuous page flow, glassmorphism, and distraction-free writing.

## ✨ V5 Features

### 🎨 **Continuous Flow Design**
- **Unified Aesthetic**: A cohesive Deep Navy (#0f172a) and Indigo palette that eliminates "blocky" section breaks.
- **Glassmorphism**: Subtle transluency and blurred backgrounds for high-end UI depth.
- **Premium Components**: Fully integrated with `shadcn/ui` for professional-grade inputs, buttons, and cards.
- **Micro-Animations**: Fluid transitions powered by Framer Motion for a tactile, responsive feel.

### 📝 **Creative Workspace**
- **Refined Editor**: A minimalist, wide-canvas editor with a floating glassmorphic toolbar for focused writing.
- **Image Intelligence**: Seamlessly manage high-resolution featured images with secure cloud storage.
- **Draft Management**: Transition effortlessly between private drafts and published stories.

### 🔐 **Enterprise-Grade Infrastructure**
- **Safe Authentication**: Secure user sessions powered by Appwrite.
- **Responsive Mastery**: A mobile-first architecture that scales perfectly from mobile handsets to ultra-wide displays.
- **Lighting Performance**: Optimized build architecture ensuring instant interactions and transitions.

## 🛠️ Tech Stack

### **Frontend Mastery**
- **React 18** & **Vite**: The engine behind the lightning-fast dev and build experience.
- **Shadcn/UI**: High-fidelity accessible components.
- **Tailwind CSS**: Utility-first styling with a custom V5 brand configuration.
- **Framer Motion**: The standard for modern web animations.

### **Backend & Services**
- **Appwrite**: Scalable authentication, NoSQL databases, and encrypted file storage.
- **Lucide React**: Beautifully consistent, pixel-perfect iconography.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Appwrite Project ID & Endpoint

### Installation

1. **Clone & Install**
   ```bash
   git clone https://github.com/your-username/megablog.git
   cd megablog
   npm install
   ```

2. **Environment Configuration**
   Create a `.env` in the root and map your Appwrite credentials:
   ```env
   VITE_APPWRITE_URL=https://cloud.appwrite.io/v1
   VITE_APPWRITE_PROJECT_ID=...
   VITE_APPWRITE_DATABASE_ID=...
   VITE_APPWRITE_COLLECTION_ID=...
   VITE_APPWRITE_BUCKET_ID=...
   ```

3. **Launch**
   ```bash
   npm run dev
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

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Appwrite](https://appwrite.io/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [TinyMCE](https://www.tiny.cloud/)
- [React Hook Form](https://react-hook-form.com/)

---

