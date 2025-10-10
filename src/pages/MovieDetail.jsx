import React from 'react';
import { useParams } from 'react-router-dom';
import {movies} from  '../../db';
import {Button} from '../components/Button';

export const MovieDetail = () => {
    const { id } = useParams();

    const data = movies.find(movie => movie.id === id);
    if (!data) return <div className="p-10 text-red-500">Movie not found.</div>;
    const isLoading = false;
    const isError = false;

    function formatDuration(duration) {
        const hours = Math.floor(duration / 60);
        const mins = duration % 60;
        return `${hours}h ${mins}m`;
    }

    function handler(url) {
        window.open(url, '_blank');
    }

    if (isLoading) return <div className="p-10">Loading...</div>;
    if (isError || !data) return <div className="p-10 text-red-500">Failed to load movie details.</div>;

    return (
        <div className="p-6 sm:p-10 min-h-screen w-full dark:bg-gray-900 dark:text-white">
            <h1 className="text-3xl sm:text-5xl font-semibold text-center">{data.title}</h1>

            <div className="flex flex-col md:flex-row gap-6 mt-10">

                {/* Left: Poster */}
                <div className="md:w-2/5 w-full">
                    <img className="w-full rounded-md" src={data.poster} alt={data.title} />
                </div>

                {/* Right: Details */}
                <div className="md:w-3/5 w-full flex flex-col gap-10  p-6 rounded-lg shadow-sm">
                    <p className=" leading-relaxed">
                        <span className="font-semibold block mb-1 ">Description:</span>
                        {data.description}
                    </p>

                    <div className="">
                        <span className="font-semibold ">Director:</span> {data.director}
                    </div>

                    <div>
                        <h2 className="font-semibold mb-1">Cast:</h2>
                        <ul className="list-disc list-inside pl-2">
                            {data.cast?.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                        <div>
                            <span className="font-semibold ">Duration:</span> {formatDuration(data.duration)}
                        </div>
                        <div>
                            <span className="font-semibold ">Release Year:</span> {data.releaseDate?.slice(0, 4)}
                        </div>
                    </div>

                    <div>
                        <h2 className="font-semibold mb-1">Genre:</h2>
                        <ul className="list-disc list-inside  pl-2">
                            {data.genre?.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    <Button onClick={() => handler(data.ytTrailerLink)}>
                        See Trailer
                    </Button>
                </div>

            </div>
        </div>
    );
};
