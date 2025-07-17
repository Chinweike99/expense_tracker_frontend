"use client";

import { X } from "lucide-react";
import { useState } from "react";
import CurrenciesPage from "./currencies/Currencies";
import CategoriesPage from "./categories/Categories";

export default function Settings () {

    const [showCategories, setShowCategories] = useState(false);
    const [showCurrenncies, setShowCurrencies] = useState(false);

    const handleShowCategories = () => {
        setShowCategories(!showCategories)
    }

    const handleSetCurrencies = () => {
        setShowCurrencies(!showCurrenncies)
    }
    return (
        <div>
            <div className="flex gap-5 ">
            <button 
            className="border p-2 px-4 rounded-xl text-gray-600 cursor-pointer"
            onClick={handleSetCurrencies}>Your Currencies</button>
                <button 
                className="border p-2 px-4 rounded-xl text-gray-600 cursor-pointer"
                onClick={handleShowCategories}>Your Categories</button>
            </div>

        {showCurrenncies ? 
        <div className="relative mt-5">
            <button className="absolute flex items-center justify-center cursor-pointer text-red-500 rounded-lg bg-red-100  px-4"
            onClick={()=>setShowCurrencies(false)}>  <X className="h-5"/> close </button>
                <CurrenciesPage />
        </div>    
     : null}

     {showCategories ?
     <div className="relative mt-5">
        <button className="absolute flex items-center justify-center cursor-pointer text-red-500 rounded-lg bg-red-100  px-4"
            onClick={()=>setShowCategories(false)}>  <X className="h-5"/> close </button>
            <CategoriesPage />
     </div>
    : null }

        </div>
    )
}