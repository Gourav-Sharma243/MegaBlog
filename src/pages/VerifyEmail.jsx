import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Container } from '../components';
import authService from '../appwrite/auth';

function VerifyEmail() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('verifying'); // 'verifying', 'success', 'error'
    const [message, setMessage] = useState('');

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const userId = searchParams.get('userId');
                const secret = searchParams.get('secret');

                if (!userId || !secret) {
                    setStatus('error');
                    setMessage('Invalid verification link. Please request a new verification email.');
                    return;
                }

                await authService.verifyEmail({ userId, secret });
                setStatus('success');
                setMessage('Your email has been successfully verified! You can now access all features.');
                
                // Redirect to profile after 3 seconds
                setTimeout(() => {
                    navigate('/profile');
                }, 3000);
                
            } catch (error) {
                console.error('Email verification error:', error);
                setStatus('error');
                
                if (error.code === 401) {
                    setMessage('Verification link has expired. Please request a new verification email.');
                } else {
                    setMessage('Email verification failed. Please try again or contact support.');
                }
            }
        };

        verifyEmail();
    }, [searchParams, navigate]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
            <Container>
                <div className="max-w-md mx-auto text-center">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                        {/* Icon */}
                        <div className="mb-6">
                            {status === 'verifying' && (
                                <div className="w-16 h-16 mx-auto bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
                                    <svg className="animate-spin h-8 w-8 text-orange-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                </div>
                            )}
                            
                            {status === 'success' && (
                                <div className="w-16 h-16 mx-auto bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                                    <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            )}
                            
                            {status === 'error' && (
                                <div className="w-16 h-16 mx-auto bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                                    <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>
                            )}
                        </div>

                        {/* Title */}
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            {status === 'verifying' && 'Verifying Your Email'}
                            {status === 'success' && 'Email Verified!'}
                            {status === 'error' && 'Verification Failed'}
                        </h1>

                        {/* Message */}
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            {status === 'verifying' && 'Please wait while we verify your email address...'}
                            {message}
                        </p>

                        {/* Actions */}
                        <div className="space-y-3">
                            {status === 'success' && (
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                    Redirecting to your profile in a few seconds...
                                </div>
                            )}
                            
                            {status === 'error' && (
                                <div className="space-y-3">
                                    <button
                                        onClick={() => navigate('/profile')}
                                        className="w-full inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-orange-600 to-teal-600 text-white font-semibold rounded-lg hover:from-orange-700 hover:to-teal-700 transition-all duration-200"
                                    >
                                        Go to Profile
                                    </button>
                                    
                                    <button
                                        onClick={() => navigate('/')}
                                        className="w-full inline-flex items-center justify-center px-4 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                                    >
                                        Go to Home
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default VerifyEmail;
