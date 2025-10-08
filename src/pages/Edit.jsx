import { useContext, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { MovieContext } from '../context/movie.context';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Title', width: 200, editable: true },
    { field: 'description', headerName: 'Description', width: 300, editable: true },
    { field: 'poster', headerName: 'Poster', width: 250, editable: true },
    { field: 'releaseDate', headerName: 'Release Date', width: 200, editable: true },
    { field: 'ytTrailerLink', headerName: 'YouTube Trailer Link', width: 250, editable: true },
];

const paginationModel = { page: 0, pageSize: 10 };

const Edit = () => {
    const { allMovies, isDarkMode } = useContext(MovieContext);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const formatted = allMovies.map((movie) => ({
            ...movie
        }));
        setRows(formatted);
    }, [allMovies]);


    const handleProcessRowUpdate = async (newRow) => {
        try {
            await fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/${newRow.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newRow)
            });

            setRows(prevRows =>
                prevRows.map(row => (row.id === newRow.id ? newRow : row))
            );

            return newRow;
        } catch (error) {
            console.error("Update failed:", error);
            return newRow;
        }
    };

    return (

        <div className='min-h-screen p-4'>
            <Paper sx={{ height: '100%', width: '100%'}}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    processRowUpdate={handleProcessRowUpdate}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    experimentalFeatures={{ newEditingApi: true }}
                    sx={{ border: 0 }}
                />
            </Paper>
        </div>
    );
};

export default Edit;
