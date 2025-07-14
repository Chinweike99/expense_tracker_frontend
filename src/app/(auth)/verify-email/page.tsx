// "use client"

// import { useEffect, useState, Suspense, useCallback } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import Link from 'next/link';

// interface VerificationState {
//   status: 'loading' | 'success' | 'error' | 'expired' | 'invalid';
//   message: string;
// }

// // Separate component that uses useSearchParams
// const VerifyEmailContent = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [verificationState, setVerificationState] = useState<VerificationState>({
//     status: 'loading',
//     message: 'Verifying your email...'
//   });

//   const verifyEmail = useCallback(async (token: string) => {
//     const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://expense-tracker-backend-xa74.onrender.com';
//     try {
      
//       const response = await fetch(`${BACKEND_URL}/api/auth/verify-email?token=${token}`, {
//         method: 'GET',
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json',
//         },
//       });

//       // Check if response is HTML (404 page) instead of JSON
//       const contentType = response.headers.get('content-type');
//       if (!contentType || !contentType.includes('application/json')) {
//         console.error('Received non-JSON response:', response.status, response.statusText);
//         setVerificationState({
//           status: 'error',
//           message: 'Server error: API endpoint not found. Please contact support.'
//         });
//         return;
//       }

//       const data = await response.json();

//       if (response.ok) {
//         setVerificationState({
//           status: 'success',
//           message: 'Email verified successfully! You can now log in to your account.'
//         });
        
//         // Redirect to login page after 3 seconds
//         setTimeout(() => {
//           router.push('/login');
//         }, 3000);
//       } else {
//         // Handle different error cases
//         if (response.status === 400) {
//           setVerificationState({
//             status: 'expired',
//             message: 'Verification link has expired. Please request a new one.'
//           });
//         } else if (response.status === 404) {
//           setVerificationState({
//             status: 'invalid',
//             message: 'Invalid verification token. Please check your link.'
//           });
//         } else {
//           setVerificationState({
//             status: 'error',
//             message: data.message || 'An error occurred during verification. Please try again.'
//           });
//         }
//       }
//     } catch (error) {
//       console.error('Verification error:', error);
//       setVerificationState({
//         status: 'error',
//         message: 'Network error. Please check your connection and try again.'
//       });
//     }
//   }, [router]);

//   useEffect(() => {
//     const token = searchParams.get('token');
    
//     if (!token) {
//       setVerificationState({
//         status: 'invalid',
//         message: 'Invalid verification link. No token provided.'
//       });
//       return;
//     }

//     verifyEmail(token);
//   }, [searchParams, verifyEmail]);

//   const resendVerificationEmail = async () => {
//     try {
//       const response = await fetch('/api/auth/resend-verification', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.ok) {
//         setVerificationState({
//           status: 'success',
//           message: 'Verification email sent! Please check your inbox.'
//         });
//       } else {
//         setVerificationState({
//           status: 'error',
//           message: 'Failed to resend verification email. Please try again later.'
//         });
//       }
//     } catch {
//       setVerificationState({
//         status: 'error',
//         message: 'Network error. Please try again later.'
//       });
//     }
//   };

//   const getStatusIcon = () => {
//     switch (verificationState.status) {
//       case 'loading':
//         return (
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//         );
//       case 'success':
//         return (
//           <div className="rounded-full bg-green-100 p-3">
//             <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//             </svg>
//           </div>
//         );
//       case 'error':
//       case 'expired':
//       case 'invalid':
//         return (
//           <div className="rounded-full bg-red-100 p-3">
//             <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   const getStatusColor = () => {
//     switch (verificationState.status) {
//       case 'loading':
//         return 'text-blue-600';
//       case 'success':
//         return 'text-green-600';
//       case 'error':
//       case 'expired':
//       case 'invalid':
//         return 'text-red-600';
//       default:
//         return 'text-gray-600';
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//           <div className="text-center">
//             <div className="mx-auto flex justify-center mb-4">
//               {getStatusIcon()}
//             </div>
            
//             <h2 className="text-2xl font-bold text-gray-900 mb-4">
//               Email Verification
//             </h2>
            
//             <p className={`text-lg mb-6 ${getStatusColor()}`}>
//               {verificationState.message}
//             </p>

//             <div className="space-y-4">
//               {verificationState.status === 'success' && (
//                 <div className="bg-green-50 border border-green-200 rounded-md p-4">
//                   <p className="text-sm text-green-800">
//                     Redirecting to login page in 3 seconds...
//                   </p>
//                 </div>
//               )}

//               {(verificationState.status === 'expired' || verificationState.status === 'error') && (
//                 <button
//                   onClick={resendVerificationEmail}
//                   className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
//                 >
//                   Resend Verification Email
//                 </button>
//               )}

//               <div className="space-y-2">
//                 <Link 
//                   href="/login"
//                   className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
//                 >
//                   Go to Login
//                 </Link>
                
//                 <Link 
//                   href="/"
//                   className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
//                 >
//                   Back to Home
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Loading fallback component
// const LoadingFallback = () => (
//   <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//     <div className="sm:mx-auto sm:w-full sm:max-w-md">
//       <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//         <div className="text-center">
//           <div className="mx-auto flex justify-center mb-4">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//           </div>
//           <h2 className="text-2xl font-bold text-gray-900 mb-4">
//             Email Verification
//           </h2>
//           <p className="text-lg mb-6 text-blue-600">
//             Loading verification page...
//           </p>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// // Main page component with Suspense wrapper
// const VerifyEmailPage = () => {
//   return (
//     <Suspense fallback={<LoadingFallback />}>
//       <VerifyEmailContent />
//     </Suspense>
//   );
// };

// export default VerifyEmailPage;



"use client"

import { useEffect, useState, Suspense, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import api from '@/app/lib/api';


interface VerificationState {
  status: 'loading' | 'success' | 'error' | 'expired' | 'invalid';
  message: string;
}

const VerifyEmailContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [verificationState, setVerificationState] = useState<VerificationState>({
    status: 'loading',
    message: 'Verifying your email...'
  });

  const verifyEmail = useCallback(async (token: string) => {
    try {
      const response = await api.get(`/api/auth/verify-email?token=${token}`);
      
      setVerificationState({
        status: 'success',
        message: response.data.message || 'Email verified successfully! You can now log in to your account.'
      });
      
      setTimeout(() => {
        router.push('/login');
      }, 3000);
      
    } catch (error: any) {
      console.error('Verification error:', error);
      
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.message || 'An error occurred during verification.';
        
        if (status === 400) {
          setVerificationState({
            status: 'expired',
            message: 'Verification link has expired. Please request a new one.'
          });
        } else if (status === 404) {
          setVerificationState({
            status: 'invalid',
            message: 'Invalid verification token. Please check your link.'
          });
        } else {
          setVerificationState({
            status: 'error',
            message: message
          });
        }
      } else if (error.request) {
        setVerificationState({
          status: 'error',
          message: 'Network error. Please check your connection and try again.'
        });
      } else {
        setVerificationState({
          status: 'error',
          message: 'An unexpected error occurred. Please try again.'
        });
      }
    }
  }, [router]);

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (!token) {
      setVerificationState({
        status: 'invalid',
        message: 'Invalid verification link. No token provided.'
      });
      return;
    }

    verifyEmail(token);
  }, [searchParams, verifyEmail]);

  const resendVerificationEmail = async () => {
    try {
      await api.post('/api/auth/resend-verification');
      
      setVerificationState({
        status: 'success',
        message: 'Verification email sent! Please check your inbox.'
      });
    } catch (error: any) {
      console.error('Resend verification error:', error);
      
      const message = error.response?.data?.message || 'Failed to resend verification email. Please try again later.';
      setVerificationState({
        status: 'error',
        message: message
      });
    }
  };

  const getStatusIcon = () => {
    switch (verificationState.status) {
      case 'loading':
        return (
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        );
      case 'success':
        return (
          <div className="rounded-full bg-green-100 p-3">
            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        );
      case 'error':
      case 'expired':
      case 'invalid':
        return (
          <div className="rounded-full bg-red-100 p-3">
            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  const getStatusColor = () => {
    switch (verificationState.status) {
      case 'loading':
        return 'text-blue-600';
      case 'success':
        return 'text-green-600';
      case 'error':
      case 'expired':
      case 'invalid':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <div className="mx-auto flex justify-center mb-4">
              {getStatusIcon()}
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Email Verification
            </h2>
            
            <p className={`text-lg mb-6 ${getStatusColor()}`}>
              {verificationState.message}
            </p>

            <div className="space-y-4">
              {verificationState.status === 'success' && (
                <div className="bg-green-50 border border-green-200 rounded-md p-4">
                  <p className="text-sm text-green-800">
                    Redirecting to login page in 3 seconds...
                  </p>
                </div>
              )}

              {(verificationState.status === 'expired' || verificationState.status === 'error') && (
                <button
                  onClick={resendVerificationEmail}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Resend Verification Email
                </button>
              )}

              <div className="space-y-2">
                <Link 
                  href="/login"
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Go to Login
                </Link>
                
                <Link 
                  href="/"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LoadingFallback = () => (
  <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div className="text-center">
          <div className="mx-auto flex justify-center mb-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Email Verification
          </h2>
          <p className="text-lg mb-6 text-blue-600">
            Loading verification page...
          </p>
        </div>
      </div>
    </div>
  </div>
);

const VerifyEmailPage = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <VerifyEmailContent />
    </Suspense>
  );
};

export default VerifyEmailPage;