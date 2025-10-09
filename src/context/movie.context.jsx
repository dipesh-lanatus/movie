import React, { createContext, useState, useEffect } from "react";
import { movies as initialMovies } from '../../db';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
    const [theme, setTheme] = useState("light");
    const [movies, setMovies] = useState([]);
    const [allMovies, setAllMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        try {
            const storedMovies = localStorage.getItem('movies');
            if (storedMovies) {
                const parsedMovies = JSON.parse(storedMovies);
                setAllMovies(parsedMovies);
                setMovies(parsedMovies);
            } else {
                setAllMovies(initialMovies);
                setMovies(initialMovies);
                localStorage.setItem('movies', JSON.stringify(initialMovies));
            }
        } catch (error) {
            setIsError(true);
            console.error('Error loading movies:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (allMovies.length > 0) {
            localStorage.setItem('movies', JSON.stringify(allMovies));
        }
    }, [allMovies]);

    useEffect(() => {
        const saved = localStorage.getItem("theme");
        if (saved) setTheme(saved);
    }, []);

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    const updateMovie = (updatedMovie) => {
        const newMovies = allMovies.map(movie =>
            movie.id === updatedMovie.id ? updatedMovie : movie
        );
        setAllMovies(newMovies);
        setMovies(newMovies);
    };

    return (
        <MovieContext.Provider
            value={{
                theme,
                setTheme,
                isLoading,
                isError,
                movies,
                setMovies,
                allMovies,
                setAllMovies,
                updateMovie
            }}
        >
            {children}
        </MovieContext.Provider>
    );
};