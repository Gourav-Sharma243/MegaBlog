import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Input, Logo } from "./index"
import authService from "../appwrite/auth"
import { useForm } from "react-hook-form"

function ForgotPassword() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [email, setEmail] = useState("")

    const forgotPassword = async (data) => {
        setError("")
        setLoading(true)
        setSuccess(false)
        
        try {
            await authService.sendPasswordRecovery(data.email)
            setEmail(data.email)
            setSuccess(true)
        } catch (error) {
            setError(error.message || "Failed to send recovery email. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    if (success) {
        return (
            <div className="flex items-center justify-center w-full min-h-screen bg-gray-50 dark:bg-gray-900">
                <div className="mx-auto w-full max-w-lg bg-white dark:bg-gray-800 rounded-xl p-10 border border-gray-200 dark:border-gray-700 shadow-lg">
                    <div className="mb-6 flex justify-center">
                        <span className="inline-block w-full max-w-[100px]">
                            <Logo width="100%" />
                        </span>
                    </div>
                    
                    <div className="text-center">
                        <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Check your email</h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            We've sent a password recovery link to <strong>{email}</strong>
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
                            Didn't receive the email? Check your spam folder or try again.
                        </p>
                        
                        <div className="space-y-4">
                            <Button
                                onClick={() => {
                                    setSuccess(false)
                                    setEmail("")
                                }}
                                className="w-full bg-orange-600 hover:bg-orange-700"
                            >
                                Try Again
                            </Button>
                            
                            <Link
                                to="/login"
                                className="block w-full text-center py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                                Back to Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex items-center justify-center w-full min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="mx-auto w-full max-w-lg bg-white dark:bg-gray-800 rounded-xl p-10 border border-gray-200 dark:border-gray-700 shadow-lg">
                <div className="mb-6 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                
                <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white mb-2">Forgot your password?</h2>
                <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
                    No worries! Enter your email and we'll send you a reset link.
                </p>
                
                {error && (
                    <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                        <p className="text-red-600 dark:text-red-400 text-center">{error}</p>
                    </div>
                )}
                
                <form onSubmit={handleSubmit(forgotPassword)} className="space-y-6">
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
                    
                    <Button
                        type="submit"
                        className="w-full bg-orange-600 hover:bg-orange-700"
                        disabled={loading}
                    >
                        {loading ? "Sending..." : "Send Reset Link"}
                    </Button>
                </form>
                
                <div className="mt-6 text-center">
                    <Link
                        to="/login"
                        className="text-sm text-orange-600 dark:text-orange-400 hover:underline"
                    >
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword