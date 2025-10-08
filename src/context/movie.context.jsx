import React, { createContext, useState, useEffect, useCallback } from "react";
import useFetch from "../hooks/useFetch";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [movies, setMovies] = useState([]);
    const [allMovies, setAllMovies] = useState([]);

    const { isLoading, isError, data } = useFetch(import.meta.env.VITE_BACKEND_ENDPOINT);

    useEffect(() => {
        if (data && Array.isArray(data)) {
            setAllMovies(data);
            setMovies(data);
        }
    }, [data]);

    return (
        <MovieContext.Provider
            value={{
                setIsDarkMode,
                isDarkMode,
                isLoading,
                isError,
                movies,
                setMovies,
                allMovies,
                setAllMovies
            }}
        >
            {children}
        </MovieContext.Provider>
    );
};
