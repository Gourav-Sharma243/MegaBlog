import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx'
import { AuthLayout, Login, ForgotPassword, ResetPassword } from './components/index.js'
import ErrorPage from './components/ErrorPage.jsx'

import AddPost from "./pages/AddPost";
import Signup from './pages/Signup'
import EditPost from "./pages/EditPost";
import Post from "./pages/Post";
import AllPosts from "./pages/AllPosts";
import MyPosts from "./pages/MyPosts";
import Profile from "./pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
        {
            path: "/",
            element: <LandingPage />,
        },
        {
            path: "/login",
            element: (
                <AuthLayout authentication={false}>
                    <Login />
                </AuthLayout>
            ),
        },
        {
            path: "/forgot-password",
            element: (
                <AuthLayout authentication={false}>
                    <ForgotPassword />
                </AuthLayout>
            ),
        },
        {
            path: "/reset-password",
            element: (
                <AuthLayout authentication={false}>
                    <ResetPassword />
                </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <Signup />
                </AuthLayout>
            ),
        },
        {
            path: "/all-posts",
            element: (
                <AuthLayout authentication>
                    <AllPosts />
                </AuthLayout>
            ),
        },
        {
            path: "/my-posts",
            element: (
                <AuthLayout authentication>
                    <MyPosts />
                </AuthLayout>
            ),
        },
        {
            path: "/add-post",
            element: (
                <AuthLayout authentication>
                    <AddPost />
                </AuthLayout>
            ),
        },
        {
            path: "/profile",
            element: (
                <AuthLayout authentication>
                    <Profile />
                </AuthLayout>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <AuthLayout authentication>
                    <EditPost />
                </AuthLayout>
            ),
        },
        {
            path: "/post/:slug",
            element: <Post />,
        },
    ],
},
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)