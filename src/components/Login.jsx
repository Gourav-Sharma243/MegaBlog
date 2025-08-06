import  { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button, Input, Logo } from "./index"
import { useDispatch } from 'react-redux'
import authService from "../appwrite/auth"
import { useForm } from "react-hook-form"

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [showVerificationReminder, setShowVerificationReminder] = useState(false)
    const [userEmail, setUserEmail] = useState("")

    const login = async (data) => {
        setError("")
        setLoading(true)
        setShowVerificationReminder(false)
        
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    dispatch(authLogin({ userData }))
                    
                    // Check if email is verified
                    if (!userData.emailVerification) {
                        setUserEmail(userData.email)
                        setShowVerificationReminder(true)
                        
                        // Still redirect after showing reminder
                        setTimeout(() => {
                            navigate("/")
                        }, 5000)
                    } else {
                        navigate("/")
                    }
                }
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    const resendVerificationEmail = async () => {
        try {
            await authService.sendEmailVerification()
            setError("")
            setShowVerificationReminder(false)
            // Show success message for resending
            setTimeout(() => {
                navigate("/")
            }, 2000)
        } catch (error) {
            setError("Failed to send verification email. Please try again.")
        }
    }

    return (
        <div className="flex items-center justify-center w-full min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
            <div className="mx-auto w-full max-w-lg bg-white dark:bg-gray-800 rounded-xl p-10 border border-gray-200 dark:border-gray-700 shadow-2xl">
                <div className="mb-6 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome back</h2>
                <p className="mt-2 text-center text-base text-gray-600 dark:text-gray-300">
                    Don&apos;t have an account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-semibold text-orange-600 dark:text-orange-400 transition-all duration-200 hover:underline hover:text-orange-700"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && (
                    <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                        <p className="text-red-600 dark:text-red-400 text-center">{error}</p>
                    </div>
                )}
                
                {showVerificationReminder && (
                    <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                        <div className="flex items-center justify-center mb-2">
                            <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                            <p className="text-yellow-600 dark:text-yellow-400 font-semibold">Email Not Verified</p>
                        </div>
                        <p className="text-yellow-600 dark:text-yellow-400 text-sm text-center mb-3">
                            Your email address <strong>{userEmail}</strong> is not verified yet. Please check your inbox for the verification email.
                        </p>
                        <div className="flex justify-center">
                            <button
                                onClick={resendVerificationEmail}
                                className="text-sm bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition-colors"
                            >
                                Resend Verification Email
                            </button>
                        </div>
                        <p className="text-yellow-500 dark:text-yellow-500 text-xs text-center mt-2">
                            Redirecting to home page in a few seconds...
                        </p>
                    </div>
                )}
                
                <form onSubmit={handleSubmit(login)} className="mt-8">
                    <div className="space-y-6">
                        <Input
                            label="Email Address"
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                    message: "Please enter a valid email address"
                                }
                            })}
                        />
                        {errors.email && <p className="text-red-600 dark:text-red-400 text-sm">{errors.email.message}</p>}
                        
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: "Password is required",
                            })}
                        />
                        {errors.password && <p className="text-red-600 dark:text-red-400 text-sm">{errors.password.message}</p>}
                        
                        <Button
                            type="submit"
                            className="w-full bg-orange-600 hover:bg-orange-700"
                            disabled={loading}
                        >
                            {loading ? "Signing in..." : "Sign in"}
                        </Button>
                    </div>
                </form>
                
                <div className="mt-6 text-center">
                    <Link
                        to="/forgot-password"
                        className="text-sm text-orange-600 dark:text-orange-400 hover:underline font-medium"
                    >
                        Forgot your password?
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login