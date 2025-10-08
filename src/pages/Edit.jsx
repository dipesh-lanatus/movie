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
    const { allMovies, isDarkMode, updateMovie } = useContext(MovieContext);
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
        <div className='min-h-screen p-4'>
            <Paper 
                sx={{ 
                    height: '100%', 
                    width: '100%',
                    bgcolor: isDarkMode ? '#1e1e1e' : '#ffffff'
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
                        color: isDarkMode ? '#ffffff' : '#000000',
                        '& .MuiDataGrid-cell': {
                            color: isDarkMode ? '#ffffff' : '#000000',
                        },
                        '& .MuiDataGrid-columnHeaders': {
                            color: isDarkMode ? '#ffffff' : '#000000',
                        }
                    }}
                />
            </Paper>
        </div>
    );
};

export default Edit;