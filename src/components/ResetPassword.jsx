import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { Button, Input, Logo } from "./index"
import authService from "../appwrite/auth"
import { useForm } from "react-hook-form"

function ResetPassword() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    
    const userId = searchParams.get('userId')
    const secret = searchParams.get('secret')
    
    const password = watch('password')

    useEffect(() => {
        if (!userId || !secret) {
            setError("Invalid reset link. Please request a new password reset.")
        }
    }, [userId, secret])

    const resetPassword = async (data) => {
        if (!userId || !secret) {
            setError("Invalid reset link. Please request a new password reset.")
            return
        }

        setError("")
        setLoading(true)
        
        try {
            await authService.completePasswordRecovery({
                userId,
                secret,
                password: data.password
            })
            setSuccess(true)
        } catch (error) {
            setError(error.message || "Failed to reset password. Please try again.")
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
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Password Reset Successful!</h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-8">
                            Your password has been successfully updated. You can now login with your new password.
                        </p>
                        
                        <Button
                            onClick={() => navigate('/login')}
                            className="w-full bg-orange-600 hover:bg-orange-700"
                        >
                            Continue to Login
                        </Button>
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
                
                <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white mb-2">Reset your password</h2>
                <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
                    Enter your new password below.
                </p>
                
                {error && (
                    <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                        <p className="text-red-600 dark:text-red-400 text-center">{error}</p>
                    </div>
                )}
                
                <form onSubmit={handleSubmit(resetPassword)} className="space-y-6">
                    <Input
                        label="New Password"
                        type="password"
                        placeholder="Enter your new password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 8,
                                message: "Password must be at least 8 characters"
                            },
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                                message: "Password must contain at least one uppercase letter, one lowercase letter, and one number"
                            }
                        })}
                    />
                    {errors.password && <p className="text-red-600 dark:text-red-400 text-sm">{errors.password.message}</p>}
                    
                    <Input
                        label="Confirm New Password"
                        type="password"
                        placeholder="Confirm your new password"
                        {...register("confirmPassword", {
                            required: "Please confirm your password",
                            validate: value => value === password || "Passwords do not match"
                        })}
                    />
                    {errors.confirmPassword && <p className="text-red-600 dark:text-red-400 text-sm">{errors.confirmPassword.message}</p>}
                    
                    <Button
                        type="submit"
                        className="w-full bg-orange-600 hover:bg-orange-700"
                        disabled={loading || !userId || !secret}
                    >
                        {loading ? "Resetting..." : "Reset Password"}
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

export default ResetPassword