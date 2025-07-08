"use client";

import { RegisterData, ApiError } from "@/@types/types";
import { useAuthStore } from "@/app/stores/auth.store";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react";



const signupSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
    // confirmPassword: z.string()
  })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords don't match",
//     path: ["confirmPassword"],
//   });



export default function RegisterPage() {
    
    const router = useRouter();
    const { register: signup, isLoading} = useAuthStore();
    const [showPassword, setShowPassword] = useState(false);
    // const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        register, 
        handleSubmit, 
        formState: { errors },
        setError,
    } = useForm<RegisterData>({
        resolver: zodResolver(signupSchema)
    });

    const onSubmit = async(data: RegisterData) => {
        try {
            await signup(data);
            router.push("/verify-email-notice")
        } catch (error: unknown) {
            const apiError = error as ApiError;
            if(apiError.response?.data?.errors){
                apiError.response.data.errors.forEach((err: { message: string; path: string[] }) => {
                    const validFields = ["name", "email", "password", "root"] as const;
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const field = validFields.includes(err.path[0] as any) ? err.path[0] as "name" | "email" | "password" | "root" : "root";
                    setError(field, {
                        type: 'manual',
                        message: err.message
                    })
                });
            }else {
                setError("root", {
                    type: "manual",
                    message: apiError.response?.data?.message || "Signup failed. Please try again"
                });
            }
            console.log(error)
        }
    }

    
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // const toggleConfirmPasswordVisibility = () => {
    //     setShowConfirmPassword(!showConfirmPassword);
    // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign in
            </Link>
          </p>
        </div>

        {errors.root && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{errors.root.message}</h3>
              </div>
            </div>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-xl shadow-lg  p-6">
            <div>
              <label htmlFor="name" className="text-[12px] ml-2 text-gray-600">
                Full Name *
              </label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                required
                className="appearance-none rounded-full relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-[12px]"
                placeholder="Full Name"
                {...register("name")}
              />
              {errors.name && (
                <p className="mt-1 text-xs ml-2 text-red-600">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="text-[12px] ml-2 text-gray-600">
                Email address*
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-full relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-[12px] "
                placeholder="Email address"
                {...register("email")}
              />
              {errors.email && (
                <p className="mt-1 text-xs ml-2 text-red-600">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="text-[12px] ml-2 text-gray-600">
                Password
              </label>
              
              <div className="flex items-center appearance-none rounded-full relative  w-full  border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-[12px]">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                className="appearance-none p-3 border h-full py-2 rounded-full relative block w-full  border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-[12px]"
                placeholder="Password"
                {...register("password")}
              />
              <button
                                type="button"
                                className=" absolute z-10 cursor-pointer right-3 text-gray-400 hover:text-gray-600"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? (
                                    <EyeOff size={20} />
                                ) : (
                                    <Eye size={20} />
                                )}
                            </button>
              {errors.password && (
                <p className="mt-1 text-xs ml-2 text-red-600">{errors.password.message}</p>
              )}
              </div>
            </div>



            {/* <div>
              <label htmlFor="confirmPassword" className="text-[12px] ml-2 text-gray-600">
                Confirm Password
              </label>
              <div  className="flex items-center appearance-none rounded-full relative  w-full  border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-[12px]">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                className="appearance-none p-3 border h-full py-2 rounded-full relative block w-full  border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-[12px]"
                placeholder="Confirm Password"
                {...register("confirmPassword")} 
              />
               

                            <button
                                type="button"
                                className=" absolute z-10 cursor-pointer right-3 text-gray-400 hover:text-gray-600"
                                onClick={toggleConfirmPasswordVisibility}
                            >
                                {showConfirmPassword ? (
                                    <EyeOff size={20} />
                                ) : (
                                    <Eye size={20} />
                                )}
                            </button> 
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-xs ml-2 text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div> */}
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-xl text-white cursor-pointer bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "Sign up"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

}


// export default RegisterPage;



