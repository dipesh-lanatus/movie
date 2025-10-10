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

export const Edit = () => {
    const { allMovies, theme, updateMovie } = useContext(MovieContext);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        setRows(allMovies);
    }, [allMovies]);

    const handleProcessRowUpdate = (newRow) => {
        try {
            updateMovie(newRow);
            setRows(rows.map(row =>
                row.id === newRow.id ? newRow : row
            ));
            return newRow;
        } catch (error) {
            console.error('Error updating row:', error);
            return false;
        }
    };

    return (
        <div className='min-h-screen p-4 dark:bg-gray-900 drak:text-white'>
            <Paper
                sx={{
                    height: '100%',
                    width: '100%',
                }}
            >
                <DataGrid
                    rows={rows}
                    columns={columns}
                    processRowUpdate={handleProcessRowUpdate}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    sx={{
                        border: 0,
                        // footer / pagination
                        '& .MuiDataGrid-footerContainer': {
                            backgroundColor: theme === 'dark' ? '#1f2937' : '#f5f5f5',
                            color: theme === 'dark' ? 'white' : 'black',
                        },
                        '& .MuiTablePagination-root, & .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                            color: theme === 'dark' ? 'white' : 'black',
                        },

                        // rows
                        '& .MuiDataGrid-cell': {
                            color: theme === 'dark' ? 'white' : 'black',
                            backgroundColor: theme === 'dark' ? '#1f2937' : '#f5f5f5',
                        },
                    }}
                />
            </Paper>
        </div>
    );
};