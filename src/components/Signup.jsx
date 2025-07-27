import React, { useState } from 'react';
import authService from '../appwrite/auth';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { Button, Input, Logo } from './index.js';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const create = async (data) => {
    setError('');
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate('/');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <div className="mx-auto w-full max-w-lg bg-white dark:bg-gray-800 rounded-xl p-10 border border-black/10 dark:border-gray-700 shadow-md">
        <div className="mb-6 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight text-gray-900 dark:text-white">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-gray-600 dark:text-gray-300">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-medium text-primary hover:underline transition duration-200"
          >
            Sign In
          </Link>
        </p>
        {error && (
          <p
            className="text-red-600 mt-6 mb-4 text-center font-medium"
            role="alert"
          >
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit(create)} noValidate>
          <div className="space-y-6">
            <Input
              label="Full Name:"
              placeholder="Enter your full name"
              className={errors.name ? 'border-red-500' : ''}
              {...register('name', { required: 'Full name is required' })}
            />
            {errors.name && (
              <p
                className="text-red-600 text-sm mt-1 pl-1"
                role="alert"
              >
                {errors.name.message}
              </p>
            )}

            <Input
              label="Email:"
              placeholder="Enter your email"
              type="email"
              className={errors.email ? 'border-red-500' : ''}
              {...register('email', {
                required: 'Email is required',
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    'Email address must be a valid address',
                },
              })}
            />
            {errors.email && (
              <p
                className="text-red-600 text-sm mt-1 pl-1"
                role="alert"
              >
                {errors.email.message}
              </p>
            )}

            <Input
              label="Password:"
              type="password"
              placeholder="Enter your password"
              className={errors.password ? 'border-red-500' : ''}
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && (
              <p
                className="text-red-600 text-sm mt-1 pl-1"
                role="alert"
              >
                {errors.password.message}
              </p>
            )}

            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
