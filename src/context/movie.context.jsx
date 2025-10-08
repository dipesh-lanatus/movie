import React, { createContext, useState, useEffect } from "react";
import { movies as initialMovies } from '../../db';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const stored = localStorage.getItem('darkMode');
        return stored ? JSON.parse(stored) : false;
    });
    
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
        localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    }, [isDarkMode]);

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
                setIsDarkMode,
                isDarkMode,
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