import  { useState } from 'react'
import authService from "../appwrite/auth"
import { Link, useNavigate } from "react-router-dom"
import { login } from "../store/authSlice"
import { Button, Input, Logo } from "./index.js"
import { useDispatch } from "react-redux"
import { useForm } from "react-hook-form"

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm()

    const create = async (data) => {
        setError("")
        setLoading(true)
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const currentUser = await authService.getCurrentUser()
                if (currentUser) dispatch(login(currentUser))
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
                <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white mb-2">Create your account</h2>
                <p className="mt-2 text-center text-base text-gray-600 dark:text-gray-300">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-semibold text-orange-600 dark:text-orange-400 transition-all duration-200 hover:underline hover:text-orange-700"
                    >
                        Sign In
                    </Link>
                </p>
                {error && (
                    <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                        <p className="text-red-600 dark:text-red-400 text-center">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit(create)} className="mt-8">
                    <div className="space-y-6">
                        <Input
                            label="Full Name"
                            placeholder="Enter your full name"
                            {...register("name", {
                                required: "Full name is required",
                            })}
                        />
                        {errors.name && <p className="text-red-600 dark:text-red-400 text-sm">{errors.name.message}</p>}
                        
                        <Input
                            label="Email Address"
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                    message: "Please enter a valid email address",
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
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters"
                                }
                            })}
                        />
                        {errors.password && <p className="text-red-600 dark:text-red-400 text-sm">{errors.password.message}</p>}
                        
                        <Button 
                            type="submit" 
                            className="w-full bg-orange-600 hover:bg-orange-700"
                            disabled={loading}
                        >
                            {loading ? "Creating Account..." : "Create Account"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup