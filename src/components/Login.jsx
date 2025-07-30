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

    const login = async (data) => {
        setError("")
        setLoading(true)
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(authLogin({ userData }))
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
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