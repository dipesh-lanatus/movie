import React from 'react'

const Button = ({ children, onClick }) => {
    return (
        <div className="w-full sm:w-auto">
            <button
                onClick={onClick}
                className="
          dark:bg-white/90 dark:text-black 
          bg-slate-600 text-white 
          py-2 px-4 sm:px-5 
          rounded-md 
          hover:scale-105 
          transition 
          w-full sm:w-auto
          text-center
        "
            >
                {children}
            </button>
        </div>
    )
}

export default Button
