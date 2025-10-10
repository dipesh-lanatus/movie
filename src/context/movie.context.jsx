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
            const storedMovies = JSON.parse(localStorage.getItem('movies')) || initialMovies;
            setAllMovies(storedMovies);
            setMovies(storedMovies);
            if (!localStorage.getItem('movies')) {
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

        document.documentElement.classList.toggle('dark', theme === 'dark');
        localStorage.setItem("theme", theme);
    }, [allMovies, theme]);

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