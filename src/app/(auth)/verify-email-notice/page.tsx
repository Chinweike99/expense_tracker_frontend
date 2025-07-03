
"use client";
import Link from "next/link";


const VerifyEmailNotice = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Verify Your Email
          </h2>
          <div className="mt-8 bg-white py-8 px-4 shadow rounded-lg">
            <div className="flex justify-center">
              <svg
                className="h-16 w-16 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="mt-4 text-center text-gray-600">
              We&apos;ve sent a verification link to your email address. Please check your inbox and click
              on the link to verify your account.
            </p>
            {/* <p className="mt-4 text-center text-sm text-gray-500">
              Didn't receive the email?{" "}
              <Link href="/resend-verification" className="font-medium text-indigo-600 hover:text-indigo-500">
                Resend verification email
              </Link>
            </p> */}
          </div>
          <div className="mt-4 text-center">
            <Link
              href="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmailNotice;