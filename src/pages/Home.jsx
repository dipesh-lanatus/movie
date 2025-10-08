import React, { useContext, useEffect, useState } from 'react'
import { MovieContext } from '../context/movie.context'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const { isLoading, isError, movies, setMovies, isDarkMode } = useContext(MovieContext);

    function formatDuration(minutes) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    }

    function handleCardClick(id) {
        navigate(`/movie/${id}`);
    }

    function sortHandler(order) {
        const sorted = [...movies].sort((a, b) => {
            const titleA = a.title.toLowerCase();
            const titleB = b.title.toLowerCase();
            return order === 'asc'
                ? titleA.localeCompare(titleB)
                : titleB.localeCompare(titleA);
        });
        setMovies(sorted);
    }

    if (isLoading) return <div className="p-10 text-center">Loading...</div>;
    if (isError) return <div className="p-10 text-red-500">{isError.message}</div>;

    return (
        <div>
            <div className="flex gap-5 justify-center mt-6">
                <button
                    onClick={() => sortHandler('asc')}
                    className="p-2 px-6 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                >
                    A-Z
                </button>
                <button
                    onClick={() => sortHandler('desc')}
                    className="p-2 px-6 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                >
                    Z-A
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
                {movies.length > 0 ? movies.map((movie) => (
                    <Card
                        onClick={() => handleCardClick(movie.id)}
                        key={movie.id}
                        sx={{
                            maxWidth: 345,
                            cursor: 'pointer',
                            backgroundColor: isDarkMode ? '#1F2937' : 'white',
                            color: isDarkMode ? 'white' : 'black',
                        }}
                    >
                        <CardMedia
                            sx={{ height: 400, objectFit: 'contain' }}
                            image={movie.poster}
                            title={movie.title}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="div">
                                {movie.title}
                            </Typography>
                            <Typography variant="body2">
                                Duration: {formatDuration(movie.duration)}
                            </Typography>
                            <Typography variant="body2">
                                Director: {movie.director}
                            </Typography>
                            <Typography variant="body2">
                                Release Year: {movie.releaseDate.slice(0, 4)}
                            </Typography>
                        </CardContent>
                    </Card>
                )) :<p className='text-center text-2xl'>No movies found</p>}
            </div>
        </div>
    );
};

export default Home;
